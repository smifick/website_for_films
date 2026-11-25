const films = [
  {id:'sintel', title:'Синтел', original:'Sintel', year:2010, genre:'Фэнтези', time:15, file:'Sintel', description:'Одинокая странница находит раненого дракончика. Когда его похищают, поиски приводят её в горы, где она узнаёт, сколько времени отняло у неё это путешествие.'},
  {id:'steel', title:'Слёзы стали', original:'Tears of Steel', year:2012, genre:'Фантастика', time:12, file:'TearsOfSteel', description:'В будущем Амстердаме группа учёных пытается остановить войну с машинами, воссоздав один разговор из прошлого.'},
  {id:'bunny', title:'Большой Бак Банни', original:'Big Buck Bunny', year:2008, genre:'Комедия', time:10, file:'BigBuckBunny', description:'Добродушный кролик наслаждается лесной тишиной, пока трое хулиганов не вынуждают его придумать хитроумный ответ.'},
  {id:'dream', title:'Мечта слонов', original:'Elephants Dream', year:2006, genre:'Фантастика', time:11, file:'ElephantsDream', description:'Двое спутников идут сквозь бесконечную машину. Один уверяет, что знает её секреты, а другой начинает сомневаться в его рассказах.'},
];
const media = 'https://storage.googleapis.com/gtv-videos-bucket/sample/';
const css = `
*{box-sizing:border-box}html{color-scheme:dark}body{margin:0;background:#0e0e0e;color:#f6f5f2;font:16px/1.55 system-ui,sans-serif}a{color:inherit}header,footer{display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,5vw,76px);min-height:74px;border-bottom:1px solid #292929;gap:16px}footer{border:0;border-top:1px solid #292929;color:#aaa;font-size:13px}.logo{font-weight:900;letter-spacing:.19em;text-decoration:none;font-size:19px}.logo i{font-style:normal;margin-right:12px}.tag,.eyebrow{text-transform:uppercase;letter-spacing:.17em;font-size:12px;font-weight:700}.tag{color:#aaa}h1,h2{font-family:Georgia,serif;font-weight:400;line-height:.98;margin:16px 0 22px}h1{font-size:clamp(58px,8vw,126px);letter-spacing:-.07em}h2{font-size:clamp(32px,5vw,65px);letter-spacing:-.05em}p{color:#bdbdbd;max-width:50ch}button,.button{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;border:1px solid #eee;background:#eee;color:#111;min-height:48px;padding:0 24px;font:700 15px system-ui;text-decoration:none}button:hover,.button:hover{background:#c9c9c9}button.secondary{background:transparent;color:#eee;border-color:#444}.gate{display:grid;grid-template-columns:1.25fr 1fr;min-height:calc(100svh - 148px)}.art{position:relative;min-height:320px;background:#222 center/cover no-repeat url('/cover.webp');display:flex;flex-direction:column;justify-content:end;padding:clamp(24px,5vw,76px);isolation:isolate}.art:before,.featured:before{content:'';position:absolute;inset:0;background:linear-gradient(0deg,#000d,transparent 80%);z-index:-1}.art h1{max-width:8ch}.art .eyebrow{border-left:2px solid #eee;padding-left:12px}.entry{align-self:center;width:min(100%,515px);padding:clamp(24px,5vw,76px);margin:auto}.entry p{margin-bottom:30px}label{display:block;font-size:14px;margin-bottom:8px}.inputrow{position:relative}input{width:100%;padding:14px 95px 14px 14px;background:#171717;color:#fff;border:1px solid #474747;border-radius:0;font:inherit}.inputrow button{position:absolute;right:0;top:0;min-height:100%;border:0;padding:0 12px;font-size:13px}.entry button[type=submit]{width:100%;margin-top:12px}.error{color:white;border-left:2px solid white;padding-left:10px}.wrap{width:min(1340px,100%);margin:auto;padding:38px clamp(20px,5vw,76px) 70px}.featured{position:relative;isolation:isolate;min-height:430px;padding:clamp(24px,5vw,70px);background:#242424 center/cover no-repeat url('/cover.webp');display:flex;flex-direction:column;justify-content:end;align-items:start}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(225px,1fr));gap:24px}.card{border-top:1px solid #444;padding-top:18px}.card img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;filter:grayscale(1);background:#222}.card h3{font:28px Georgia;margin:14px 0 6px}.card a{text-underline-offset:6px}.card p{font-size:15px}video{width:100%;max-height:72vh;background:#000;margin-top:20px}.credit{font-size:14px}@media(max-width:720px){.gate{grid-template-columns:1fr}.art{min-height:300px}.entry{padding-top:42px;padding-bottom:50px}header,footer{min-height:64px}.featured{min-height:340px}}
`;
const logo = '<a class="logo" href="/"><i>◩</i>BASELINE</a>';
function page(title, body, signedIn = false, status = 200) {
  return new Response(`<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · BASELINE</title><style>${css}.administration{max-width:540px;margin:auto}.administration form{display:grid;gap:12px;margin-top:24px}.administration input,.administration textarea{padding:12px;border:1px solid #474747;color:white;background:#171717;font:inherit;width:100%}.administration label{margin:0}.administration button:disabled{opacity:.55;cursor:wait}</style><header>${logo}${signedIn ? '<form method="post" action="/logout"><button class="secondary">Выйти</button></form>' : '<span class="tag">Частный кинозал</span>'}</header>${body}<footer><span>BASELINE CINEMA</span><span>Онлайн-кинотеатр</span></footer></html>`, {status, headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY'}});
}
function gate(error = '', status = 200) {
  return page('Вход', `<main class="gate"><section class="art"><span class="eyebrow">Закрытая коллекция</span><h1>Частный кинозал</h1></section><section class="entry"><h2>Вход в кинозал</h2><p>Введите код доступа, чтобы открыть каталог и смотреть фильмы.</p><form method="post" action="/"><label for="code">Код доступа</label><div class="inputrow"><input id="code" name="code" type="password" required maxlength="128" autocomplete="current-password"><button type="button" class="secondary" aria-pressed="false" onclick="const input=this.previousElementSibling;const show=input.type==='password';input.type=show?'text':'password';this.textContent=show?'Скрыть':'Показать';this.setAttribute('aria-pressed',show)">Показать</button></div>${error ? `<p class="error" role="alert">${error}</p>` : ''}<button type="submit">Открыть кинозал</button></form></section></main>`,false,status);
}
function metadata(film) {if(film.uploaded) return 'Загруженный фильм'; return `${film.year} · ${film.genre} · ${film.time} мин`;}
function catalog(uploaded) {
  return page('Фильмы', `<main class="wrap"><section class="featured"><span class="eyebrow">В центре внимания</span><h1>Синтел</h1><span>${metadata(films[0])}</span><p>${films[0].description}</p><a class="button" href="/film/sintel">Смотреть фильм</a></section><h2>Коллекция</h2><div class="grid">${[...uploaded,...films].map(film=>`<article class="card"><a href="/film/${film.id}" aria-label="${film.title}">${film.uploaded ? '<img src="/cover.webp" alt="" loading="lazy">' : `<img src="/poster/${film.id}" alt="" loading="lazy">`}</a><h3><a href="/film/${film.id}">${film.title}</a></h3><span class="tag">${metadata(film)}</span><p>${film.description}</p></article>`).join('')}</div></main>`,true);
}
function filmPage(film) {
  return page(film.title,`<main class="wrap"><a href="/">Все фильмы</a><h1>${film.title}</h1><span class="tag">${film.original ? film.original + ' · ' : ''}${metadata(film)}</span><video controls playsinline preload="metadata" poster="${film.uploaded ? '/cover.webp' : `/poster/${film.id}`}" src="/video/${film.id}" onerror="document.getElementById('video-error').hidden=false"></video><p id="video-error" role="alert" hidden>Видео не загрузилось. Попробуйте обновить страницу.</p><p>${film.description}</p>${film.uploaded ? '' : `<p class="credit">© Blender Foundation · <a href="https://studio.blender.org/films/">Blender Studio</a> · <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a></p>`}</main>`,true);
}
const encoder = new TextEncoder();
async function signature(secret, value) {
  const key = await crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,encoder.encode(value))), b=>b.toString(16).padStart(2,'0')).join('');
}
function equal(a,b) {
  let difference = a.length ^ b.length;
  for(let i=0;i<b.length;i++) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
}
async function authenticated(request, secret, admin = false) {
  const pattern = admin ? /(?:^|;\s*)baseline_admin=(\d{10})\.([a-f0-9]{64})(?:;|$)/ : /(?:^|;\s*)baseline_session=(\d{10})\.([a-f0-9]{64})(?:;|$)/;
  const match = request.headers.get('Cookie')?.match(pattern);
  return Boolean(match && Number(match[1]) > Date.now()/1000 && equal(match[2],await signature(secret,(admin ? 'admin:' : 'session:')+match[1])));
}
function redirect(request, token, maxAge, admin = false) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return new Response(null,{status:303,headers:{Location:admin ? '/admin' : '/','Cache-Control':'no-store','Set-Cookie':`${admin ? 'baseline_admin' : 'baseline_session'}=${token}; Path=/; HttpOnly${secure}; SameSite=Strict; Max-Age=${maxAge}`}});
}
async function proxy(request, url) {
  const headers = new Headers();
  if(request.headers.has('Range')) headers.set('Range',request.headers.get('Range'));
  try {
    const upstream = await fetch(url,{method:request.method,headers});
    const result = new Headers({'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'});
    for(const name of ['Content-Type','Content-Length','Content-Range','Accept-Ranges']) if(upstream.headers.has(name)) result.set(name,upstream.headers.get(name));
    return new Response(upstream.body,{status:upstream.status,headers:result});
  } catch {
    return new Response('Источник видео недоступен',{status:502});
  }
}
const maxUpload = 90 * 1024 * 1024;
const escapeHTML = (value) => value.replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
})[char]);
function uploadedFilm(object) {
  return {
    id:object.key.slice('films/'.length),
    title:escapeHTML(object.customMetadata.title),
    description:escapeHTML(object.customMetadata.description),
    uploaded:true,
  };
}
async function listUploads(bucket) {
  if(!bucket) return [];
  const films = [];
  let cursor;
  do {
    const result = await bucket.list({prefix:'films/',include:['customMetadata'],cursor});
    films.push(...result.objects.map(uploadedFilm));
    cursor = result.truncated ? result.cursor : undefined;
  } while(cursor);
  return films.reverse();
}
function adminPage(signedIn, bucket, error = '') {
  const form = signedIn ? `<form id="upload"><label for="title">Название</label><input id="title" name="title" required maxlength="120"><label for="description">Описание</label><textarea id="description" name="description" required maxlength="800" rows="4"></textarea><label for="movie">Файл MP4, до 90 МБ</label><input id="movie" type="file" accept=".mp4,video/mp4" required><button>Загрузить фильм</button></form><p id="upload-status" role="status"></p>
<script>
const form = document.getElementById('upload');
const status = document.getElementById('upload-status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const file = document.getElementById('movie').files[0];
  if(!file || !file.size || file.size > ${maxUpload} || !file.name.toLowerCase().endsWith('.mp4')) {
    status.textContent = 'Выберите файл MP4 размером до 90 МБ.';
    return;
  }
  const button = form.querySelector('button');
  button.disabled = true;
  status.textContent = 'Фильм загружается…';
  try {
    const metadata = Object.fromEntries(new FormData(form));
    const response = await fetch('/admin/upload', {method:'POST',headers:{
      'Content-Type':'video/mp4',
      'X-Film-Metadata':encodeURIComponent(JSON.stringify(metadata)),
      'X-Film-Size':String(file.size)
    },body:file});
    if(!response.ok) throw new Error(response.status === 401 ? 'Сеанс истёк. Войдите снова.' : 'Не удалось загрузить фильм.');
    form.reset();
    status.textContent = 'Фильм добавлен в каталог.';
  } catch(error) {
    status.textContent = error.message || 'Не удалось загрузить фильм.';
  } finally {
    button.disabled = false;
  }
});
</script>` : `<form method="post" action="/admin"><label for="user">Логин</label><input id="user" name="user" required maxlength="128" autocomplete="username"><label for="password">Пароль</label><input id="password" name="password" type="password" required maxlength="128" autocomplete="current-password"><button>Войти</button></form>`;
  return page('Администрирование', `<main class="wrap"><section class="administration"><a href="/">К кинотеатру</a><h2>${signedIn ? 'Загрузка фильма' : 'Вход администратора'}</h2>${error ? `<p class="error" role="alert">${error}</p>` : ''}${signedIn && !bucket ? '<p>Хранилище фильмов временно недоступно.</p>' : form}${signedIn ? '<form method="post" action="/admin/logout"><button class="secondary">Выйти из панели</button></form>' : ''}</section></main>`);
}
async function saveFilm(request, bucket) {
  if(!bucket) return new Response(null,{status:503});
  const length = Number(request.headers.get('X-Film-Size'));
  if(!Number.isSafeInteger(length) || length < 12 || length > maxUpload) return new Response(null,{status:413});
  if(!request.body || request.headers.get('Content-Type') !== 'video/mp4') return new Response(null,{status:415});
  let title, description;
  try {
    const raw = request.headers.get('X-Film-Metadata') ?? '';
    ({title,description} = JSON.parse(decodeURIComponent(raw)));
    title = title.trim();
    description = description.trim();
    if(!title || title.length > 120 || !description || description.length > 800) throw new Error();
  } catch {
    return new Response(null,{status:400});
  }
  let remaining = length;
  const stream = typeof FixedLengthStream === 'function' ? new FixedLengthStream(length) : new TransformStream({
    transform(chunk, controller) {
      remaining -= chunk.byteLength;
      if(remaining < 0) throw new Error('Upload exceeds declared length');
      controller.enqueue(chunk);
    },
    flush() {
      if(remaining !== 0) throw new Error('Incomplete upload');
    },
  });
  const id = crypto.randomUUID();
  await Promise.all([
    request.body.pipeTo(stream.writable),
    bucket.put('films/'+id,stream.readable,{customMetadata:{title,description},httpMetadata:{contentType:'video/mp4'}}),
  ]);
  return new Response(null,{status:201});
}
async function uploadedVideo(request, bucket, object) {
  const range = request.headers.get('Range');
  let offset = 0;
  let length = object.size;
  const invalidRange = () => new Response(null,{status:416,headers:{'Content-Range':`bytes */${object.size}`,'Cache-Control':'private, no-store'}});
  if(range && request.method === 'GET') {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if(!match || (!match[1] && !match[2])) return invalidRange();
    offset = match[1] ? Number(match[1]) : Math.max(0,object.size-Number(match[2]));
    const end = match[1] && match[2] ? Math.min(object.size-1,Number(match[2])) : object.size-1;
    length = end-offset+1;
    if(!Number.isSafeInteger(offset) || offset >= object.size || length < 1) return invalidRange();
  }
  const partial = Boolean(range && request.method === 'GET');
  const headers = {'Content-Type':'video/mp4','Content-Length':String(length),'Accept-Ranges':'bytes','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'};
  if(partial) headers['Content-Range'] = `bytes ${offset}-${offset+length-1}/${object.size}`;
  if(request.method === 'HEAD') return new Response(null,{headers});
  const video = await bucket.get(object.key,partial ? {range:{offset,length}} : undefined);
  return video ? new Response(video.body,{status:partial ? 206 : 200,headers}) : new Response(null,{status:404});
}
export default {async fetch(request, env) {
  const url = new URL(request.url);
  const {pathname} = url;
  if(pathname === '/cover.webp' && request.method === 'GET') return new Response(Uint8Array.from(atob(COVER), c=>c.charCodeAt(0)),{headers:{'Content-Type':'image/webp','Cache-Control':'public, max-age=3600'}});
  const {ACCESS_CODE:code,SESSION_SECRET:secret} = env;
  if(!code || !secret) return gate('Вход временно недоступен.',503);
  if(request.method === 'POST') {
    const origin = request.headers.get('Origin');
    const site = request.headers.get('Sec-Fetch-Site');
    const sameOrigin = site ? site === 'same-origin' : !origin || origin === url.origin;
    if(!sameOrigin) return new Response(null,{status:403});
    if(pathname === '/admin') {
      if(!env.ADMIN_USER || !env.ADMIN_PASSWORD) return adminPage(false,env.BUCKET,'Вход временно недоступен.');
      const text = await request.text();
      if(text.length > 1024) return adminPage(false,env.BUCKET,'Неверный логин или пароль.');
      const form = new URLSearchParams(text);
      const credentials = JSON.stringify([form.get('user'),form.get('password')]);
      const expected = JSON.stringify([env.ADMIN_USER,env.ADMIN_PASSWORD]);
      if(!equal(await signature(secret,'credentials:'+credentials),await signature(secret,'credentials:'+expected))) {
        return adminPage(false,env.BUCKET,'Неверный логин или пароль.');
      }
      const ttl = 3600;
      const expiry = Math.floor(Date.now()/1000)+ttl;
      return redirect(request,`${expiry}.${await signature(secret,'admin:'+expiry)}`,ttl,true);
    }
    if(pathname === '/admin/logout') return redirect(request,'',0,true);
    if(pathname === '/admin/upload') {
      if(!await authenticated(request,secret,true)) return new Response(null,{status:401});
      try { return await saveFilm(request,env.BUCKET); }
      catch { return new Response(null,{status:502}); }
    }
    if(pathname === '/logout') return redirect(request,'',0);
    if(pathname !== '/' && pathname !== '/login') return new Response(null,{status:404});
    const reader = request.body?.getReader();
    if(!reader) return gate('Введите код доступа.',400);
    let body = '';
    const decoder = new TextDecoder();
    while(true) {
      const {value,done} = await reader.read();
      if(done) break;
      if(value.length > 1024 || body.length + value.length > 1024) {
        await reader.cancel();
        return gate('Введите код доступа.',400);
      }
      body += decoder.decode(value,{stream:true});
    }
    const submitted = new URLSearchParams(body + decoder.decode()).get('code') ?? '';
    const expected = await signature(secret,'code:'+code);
    if(!equal(await signature(secret,'code:'+submitted),expected)) return gate('Неверный код доступа. Попробуйте ещё раз.');
    const ttl = 8*60*60;
    const expiry = Math.floor(Date.now()/1000)+ttl;
    return redirect(request,`${expiry}.${await signature(secret,'session:'+expiry)}`,ttl);
  }
  if(!['GET','HEAD'].includes(request.method)) return new Response(null,{status:405});
  if(pathname === '/admin' || pathname === '/admin/') return adminPage(await authenticated(request,secret,true),env.BUCKET);
  const signedIn = await authenticated(request,secret);
  if(pathname === '/' || pathname === '/login') return signedIn ? catalog(await listUploads(env.BUCKET)) : gate();
  if(!signedIn) return new Response(null,{status:401,headers:{'Cache-Control':'no-store'}});
  const [,route,id] = pathname.split('/');
  if(env.BUCKET && ['film','video'].includes(route) && /^[a-f0-9-]{36}$/.test(id) && pathname === `/${route}/${id}`) {
    const object = await env.BUCKET.head('films/'+id);
    if(object) return route === 'film' ? filmPage(uploadedFilm(object)) : uploadedVideo(request,env.BUCKET,object);
  }
  const film = films.find(item=>item.id===id);
  if(film && pathname === `/${route}/${id}`) {
    if(route==='film') return filmPage(film);
    if(route==='video') return proxy(request,`${media}${film.file}.mp4`);
    if(route==='poster') return proxy(request,`${media}images/${film.file}.jpg`);
  }
  return page('Страница не найдена','<main class="wrap"><h2>Страница не найдена</h2><a href="/">Вернуться в каталог</a></main>',true,404);
}};
const COVER = '';
