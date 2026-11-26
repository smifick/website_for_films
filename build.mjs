import { mkdir, readFile, writeFile } from 'node:fs/promises';

const source = await readFile('worker.mjs', 'utf8');
const images = Object.fromEntries(await Promise.all(
  ['cover.webp', 'login.webp', 'admin.webp'].map(async name => [
    '/' + name, (await readFile(name)).toString('base64'),
  ])
));

await mkdir('dist/server', { recursive: true });
await writeFile('dist/server/index.js', source.replace('const IMAGES = {};', `const IMAGES = ${JSON.stringify(images)};`));
