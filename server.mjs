import { createServer } from 'node:http';
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { randomBytes, randomUUID } from 'node:crypto';
import { resolve, join } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import app from './dist/server/index.js';

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
const env = Object.fromEntries(Object.entries(local).map(([key, value]) => [key, process.env[key] || value]));

const uuid = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/;
function directory(key) {
  const id = key.slice('films/'.length);
  if (!key.startsWith('films/') || !uuid.test(id)) throw new Error('Invalid film key');
  return join(data, id);
}
async function head(key) {
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
  async get(key, { range } = {}) {
    const path = join(directory(key), 'video.mp4');
    const options = range ? { start: range.offset, end: range.offset + range.length - 1 } : {};
    return { body: Readable.toWeb(createReadStream(path, options)) };
  },
};

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 3000);
const origin = new URL(process.env.PUBLIC_ORIGIN || `http://localhost:${port}`).origin;
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
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    if (!response.body || method === 'HEAD') outgoing.end();
    else await pipeline(Readable.fromWeb(response.body), outgoing);
  } catch (error) {
    if (!outgoing.headersSent) outgoing.writeHead(500);
    if (!outgoing.destroyed) outgoing.end();
    console.error(error.message);
  }
}).listen(port, host, () => console.log(`BASELINE Cinema: ${origin}\nLocal credentials: ${settings}`));
