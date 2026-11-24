import { mkdir, readFile, writeFile } from 'node:fs/promises';
const [source, cover] = await Promise.all([readFile('worker.mjs','utf8'),readFile('cover.webp')]);
await mkdir('dist/server',{recursive:true});
await writeFile('dist/server/index.js',source.replace("const COVER = '';",`const COVER = '${cover.toString('base64')}';`));
