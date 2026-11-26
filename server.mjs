import { createServer } from 'node:http';
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { randomBytes, randomUUID } from 'node:crypto';
import { resolve, join } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import app from './dist/server/index.js';
import { createCommunity } from './community.mjs';

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 3000);
const origin = new URL(process.env.PUBLIC_ORIGIN || `http://localhost:${port}`).origin;
const loopback = ['localhost', '127.0.0.1', '[::1]', '::1'];
const localOnly = loopback.includes(host) && loopback.includes(new URL(origin).hostname);
const data = resolve(process.env.FILM_DATA_DIR || 'film-data');
await mkdir(data, { recursive: true, mode: 0o700 });
const settings = join(data, 'local-auth.json');
try {
  await writeFile(settings, JSON.stringify({
    ACCESS_CODE: randomBytes(8).toString('hex'),
    SESSION_SECRET: randomBytes(32).toString('hex'),
    ADMIN_USER: 'admin',
    ADMIN_PASSWORD: randomBytes(16).toString('hex'),
  }), { flag: 'wx', mode: 0o600 });
} catch (error) {
  if (error.code !== 'EEXIST') throw error;
}
const local = JSON.parse(await readFile(settings, 'utf8'));
const env = {
  ACCESS_CODE: process.env.ACCESS_CODE || (localOnly ? 'youngcc' : local.ACCESS_CODE),
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || (localOnly ? 'youngcc' : local.ADMIN_PASSWORD),
  ADMIN_USER: process.env.ADMIN_USER || local.ADMIN_USER,
  SESSION_SECRET: process.env.SESSION_SECRET || local.SESSION_SECRET,
};

env.COMMUNITY = createCommunity(data, env.SESSION_SECRET, {
  clientId: process.env.GMAIL_CLIENT_ID,
  clientSecret: process.env.GMAIL_CLIENT_SECRET,
  refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  mailFrom: process.env.MAIL_FROM,
});
env.SUPPORT_DETAILS = process.env.SUPPORT_DETAILS;
env.SUPPORT_INSTAGRAM = process.env.SUPPORT_INSTAGRAM;
env.SUPPORT_EMAIL = process.env.SUPPORT_EMAIL;
env.SUPPORT_TELEGRAM = process.env.SUPPORT_TELEGRAM;

const uuid = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/;
function directory(key) {
  const id = key.slice('films/'.length);
  if (!key.startsWith('films/') || !uuid.test(id)) throw new Error('Invalid film key');
  return join(data, id);
}
function coverPath(key) {
  const id = key.slice('covers/'.length);
  if (!key.startsWith('covers/') || !uuid.test(id)) throw new Error('Invalid cover key');
  return join(data, id + '.jpg');
}
async function head(key) {
  if (key.startsWith('covers/')) {
    try {
      return { key, size: (await stat(coverPath(key))).size };
    } catch (error) {
      if (error.code === 'ENOENT') return null;
      throw error;
    }
  }
  const path = directory(key);
  try {
    const [metadata, file] = await Promise.all([readFile(join(path, 'metadata.json'), 'utf8'), stat(join(path, 'video.mp4'))]);
    return { key, size: file.size, customMetadata: JSON.parse(metadata) };
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}
env.BUCKET = {
  head,
  async list() {
    const ids = (await readdir(data)).filter(name => uuid.test(name));
    const objects = await Promise.all(ids.map(id => head('films/' + id)));
    return { objects: objects.filter(Boolean), truncated: false };
  },
  async put(key, body, { customMetadata }) {
    if (key.startsWith('covers/')) {
      const path = coverPath(key);
      const stage = join(data, '.cover-' + randomUUID());
      try {
        await writeFile(stage, body, { flag: 'wx', mode: 0o600 });
        await rename(stage, path);
      } finally {
        await rm(stage, { force: true });
      }
      return;
    }
    const path = directory(key);
    const stage = join(data, '.upload-' + randomUUID());
    await mkdir(stage, { mode: 0o700 });
    try {
      await pipeline(Readable.fromWeb(body), createWriteStream(join(stage, 'video.mp4')));
      await writeFile(join(stage, 'metadata.json'), JSON.stringify(customMetadata));
      await rename(stage, path);
    } finally {
      await rm(stage, { recursive: true, force: true });
    }
  },
  async delete(key) {
    await rm(coverPath(key), { force: true });
  },
  async get(key, { range } = {}) {
    if (key.startsWith('covers/') && !await head(key)) return null;
    const path = key.startsWith('covers/') ? coverPath(key) : join(directory(key), 'video.mp4');
    const options = range ? { start: range.offset, end: range.offset + range.length - 1 } : {};
    return { body: Readable.toWeb(createReadStream(path, options)) };
  },
};

createServer(async (incoming, outgoing) => {
  try {
    const url = new URL(origin);
    const target = incoming.url.split('?');
    url.pathname = target.shift();
    url.search = target.join('?');
    const method = incoming.method;
    const body = ['GET', 'HEAD'].includes(method) ? undefined : Readable.toWeb(incoming);
    const request = new Request(url, { method, headers: incoming.headers, body, duplex: 'half' });
    const response = await app.fetch(request, env);
    const headers = Object.fromEntries(response.headers);
    const cookies = response.headers.getSetCookie();
    if (cookies.length) headers['set-cookie'] = cookies;
    outgoing.writeHead(response.status, headers);
    if (!response.body || method === 'HEAD') outgoing.end();
    else await pipeline(Readable.fromWeb(response.body), outgoing);
  } catch (error) {
    if (!outgoing.headersSent) outgoing.writeHead(500);
    if (!outgoing.destroyed) outgoing.end();
    console.error(error.message);
  }
}).listen(port, host, () => console.log(`youngcinemaclub: ${origin}\nLocal credentials: ${settings}`));
