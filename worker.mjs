const css = `
*{box-sizing:border-box}html{color-scheme:dark}body{margin:0;background:#0e0e0e;color:#f6f5f2;font:16px/1.55 system-ui,sans-serif}a{color:inherit}header,footer{display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,5vw,76px);min-height:74px;border-bottom:1px solid #292929;gap:16px}footer{border:0;border-top:1px solid #292929;color:#aaa;font-size:13px}.logo{font-weight:900;letter-spacing:.19em;text-decoration:none;font-size:19px}.logo i{font-style:normal;margin-right:12px}.tag,.eyebrow{text-transform:uppercase;letter-spacing:.17em;font-size:12px;font-weight:700}.tag{color:#aaa}h1,h2{font-family:Georgia,serif;font-weight:400;line-height:.98;margin:16px 0 22px}h1{font-size:clamp(58px,8vw,126px);letter-spacing:-.07em}h2{font-size:clamp(32px,5vw,65px);letter-spacing:-.05em}p{color:#bdbdbd;max-width:50ch}button,.button{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;border:1px solid #eee;background:#eee;color:#111;min-height:48px;padding:0 24px;font:700 15px system-ui;text-decoration:none}button:hover,.button:hover{background:#c9c9c9}button.secondary{background:transparent;color:#eee;border-color:#444}.gate{display:grid;grid-template-columns:1.25fr 1fr;min-height:calc(100svh - 148px)}.art{position:relative;min-height:320px;background:#221814 center 35%/cover no-repeat url('/projection-room.webp');display:flex;flex-direction:column;justify-content:end;padding:clamp(24px,5vw,76px);isolation:isolate}.art:before{content:'';position:absolute;inset:0;background:linear-gradient(0deg,#110a08f5,#110a08b8 30%,transparent 68%);z-index:-1}.art h1{max-width:13ch;font-size:clamp(40px,6vw,90px);overflow-wrap:anywhere}.art .eyebrow{border-left:2px solid #eee;padding-left:12px}.entry{align-self:center;width:min(100%,515px);padding:clamp(24px,5vw,76px);margin:auto}.entry p{margin-bottom:30px}label{display:block;font-size:14px;margin-bottom:8px}.inputrow{position:relative}input{width:100%;padding:14px 95px 14px 14px;background:#171717;color:#fff;border:1px solid #474747;border-radius:0;font:inherit}.inputrow button{position:absolute;right:0;top:0;min-height:100%;border:0;padding:0 12px;font-size:13px}.entry button[type=submit]{width:100%;margin-top:12px}.error{color:white;border-left:2px solid white;padding-left:10px}.wrap{width:min(1340px,100%);margin:auto;padding:38px clamp(20px,5vw,76px) 70px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(225px,1fr));gap:24px}.card{border-top:1px solid #444;padding-top:18px}.card img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;background:#222}.card h3{font:28px Georgia;margin:14px 0 6px}.card a{text-underline-offset:6px}.card p{font-size:15px}video{width:100%;max-height:72vh;background:#000;margin-top:20px}@media(max-width:720px){.gate{grid-template-columns:1fr}.art{min-height:300px}.entry{padding-top:42px;padding-bottom:50px}header,footer{min-height:64px;flex-wrap:wrap;padding-block:12px}}
html{--paper:#121113;--panel:#1b191d;--ink:#f6f1e7;--muted:#bcb5ad;--line:#514848;--button:#f0dfc8;--button-text:#221813;--accent:#e3a069}
html[data-theme=light]{color-scheme:light;--paper:#f7efe2;--panel:#fffaf1;--ink:#261c20;--muted:#624f49;--line:#a48f83;--button:#39242b;--button-text:#fff2df;--accent:#87402b}
body{color:var(--ink);background:var(--paper)}
header,footer,.card{border-color:var(--line)}
header nav{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
header nav a{padding:10px 0}
footer,p,.tag{color:var(--muted)}
button,.button{background:var(--button);color:var(--button-text);border-color:var(--button)}
button:hover,.button:hover{background:var(--accent);color:var(--paper)}
button.secondary{color:var(--ink);border-color:var(--line)}
input,textarea,#upload input,#upload textarea,.administration form input,.administration form textarea{color:var(--ink);background:var(--panel);border-color:var(--line)}
.entry{width:100%;max-width:none;padding-inline:clamp(24px,7vw,115px);position:relative}
.entry:before,.entry:after{content:'';display:block;height:10px;margin:0 0 28px;background:repeating-linear-gradient(90deg,var(--line) 0 13px,transparent 13px 25px);opacity:.62;border-radius:3px}
.entry:after{margin:28px 0 0}
.art{color:#fff7e9;border-inline-end:5px solid var(--accent);gap:12px}
.art .eyebrow,.art h1{text-shadow:0 2px 12px #090605}
.keaton-still{align-self:start;width:clamp(68px,10vw,136px);height:auto;margin-bottom:auto;border:5px solid #ede4d3;border-bottom-width:12px;box-shadow:0 10px 25px #060403b3;transform:rotate(-6deg)}
.error{color:var(--ink);border-color:var(--accent)}
.search,.discussion form{display:grid;gap:10px;max-width:520px;margin:0 0 28px}
.search label,.discussion label{margin:0}
.search input,.discussion input,.discussion textarea{padding:12px;border:1px solid var(--line);font:inherit;width:100%}
.search>div{display:flex;gap:8px}
.search input{min-width:0}
.discussion{margin-top:48px;border-top:1px solid var(--line);padding-top:24px}
.discussion details{margin:18px 0}
.discussion summary{cursor:pointer;color:var(--accent)}
.discussion details form{margin-top:12px}
.messages article{border-top:1px solid var(--line);padding:18px 0;overflow-wrap:anywhere}
.messages p,.support-details{white-space:pre-wrap}
.support-title{overflow-wrap:anywhere}.support-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:32px}
.support-grid section{background:var(--panel);padding:clamp(18px,4vw,35px);border-top:4px solid var(--accent);overflow-wrap:anywhere}
.support-grid dd{margin:0 0 14px}
@media(max-width:720px){.art{min-height:405px;border-inline-end:0;border-bottom:5px solid var(--accent);background-position:center 28%}.search>div{flex-wrap:wrap}}

`;
const themeSetup = `<script>
try { document.documentElement.dataset.theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark'; } catch {}
</script>`;
const themeButton = `<button type="button" id="theme-toggle" class="secondary">Сменить тему</button><script>
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
function updateThemeToggle() {
  themeToggle.textContent = root.dataset.theme === 'light' ? 'Тёмная тема' : 'Светлая тема';
}
updateThemeToggle();
themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
  updateThemeToggle();
});
</script>`;
const logo = '<a class="logo" href="/"><i>◩</i>сообщество молодого кино</a>';
function page(title, body, signedIn = false, status = 200) {
  return new Response(`<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · youngcinemaclub</title>${themeSetup}<style>${css}.administration{max-width:540px;margin:auto}.admin-photo{display:block;width:min(100%,360px);height:auto;margin:24px auto}.administration form{display:grid;gap:12px;margin-top:24px}.administration input,.administration textarea{padding:12px;border:1px solid #474747;color:white;background:#171717;font:inherit;width:100%}.administration label{margin:0}.administration fieldset{margin:0;border:1px solid #474747;padding:12px;min-width:0}.cover-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.administration .cover-options label{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:6px;cursor:pointer}.administration .cover-options input{width:auto;margin:0}.cover-options img{grid-column:1/-1;width:100%;aspect-ratio:16/10;object-fit:cover}.administration button:disabled{opacity:.55;cursor:wait}</style><header>${logo}<nav aria-label="Навигация"><a href="/support">Поддержать</a>${themeButton}${signedIn ? '<form method="post" action="/logout"><button class="secondary">Выйти</button></form>' : ''}</nav></header>${body}<footer><span>youngcinemaclub</span><span>Онлайн-кинотеатр</span></footer></html>`, {status, headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY'}});
}
function gate(error = '', status = 200) {
  return page('Вход', `<main class="gate"><section class="art"><img class="keaton-still" src="/login.webp" width="850" height="1088" alt="Бастер Китон с кинокамерой"><span class="eyebrow">Закрытая коллекция</span><h1>Частный кинозал молодого кино</h1></section><section class="entry"><h2>Вход в кинозал</h2><p>Введите код доступа, чтобы открыть каталог и смотреть фильмы.</p><form method="post" action="/"><label for="code">Код доступа</label><div class="inputrow"><input id="code" name="code" type="password" required maxlength="128" autocomplete="current-password"><button type="button" class="secondary" aria-pressed="false" onclick="const input=this.previousElementSibling;const show=input.type==='password';input.type=show?'text':'password';this.textContent=show?'Скрыть':'Показать';this.setAttribute('aria-pressed',show)">Показать</button></div>${error ? `<p class="error" role="alert">${error}</p>` : ''}<button type="submit">Открыть кинозал</button></form></section></main>`,false,status);
}
function catalog(films, query) {
  const normalize = value => value.normalize('NFC').toLocaleLowerCase('ru').replaceAll('ё','е');
  const matching = query ? films.filter(film => normalize(film.rawTitle).includes(normalize(query))) : films;
  const cards = matching.map(film=>`<article class="card"><a href="/film/${film.id}" aria-label="${film.title}"><img src="${film.cover}" alt="" loading="lazy"></a><h3><a href="/film/${film.id}">${film.title}</a></h3><p>${film.description}</p></article>`).join('');
  const content = cards ? `<div class="grid">${cards}</div>` : query ? '<p>Фильмы по этому запросу не найдены.</p>' : '<p>Фильмы пока не добавлены.</p>';
  return page('Фильмы', `<main class="wrap"><h1>Коллекция</h1><form class="search" role="search" action="/"><label for="film-search">Поиск по названию</label><div><input id="film-search" type="search" name="q" maxlength="120" value="${escapeHTML(query)}"><button>Найти</button></div>${query ? '<a href="/">Сбросить поиск</a>' : ''}</form>${content}</main>`,true);
}
function filmPage(film, comments = '') {
  return page(film.title,`<main class="wrap"><a href="/">Все фильмы</a><h1>${film.title}</h1><video controls playsinline preload="metadata" poster="${film.cover}" src="/video/${film.id}" onerror="document.getElementById('video-error').hidden=false"></video><p id="video-error" role="alert" hidden>Видео не загрузилось. Попробуйте обновить страницу.</p><p>${film.description}</p>${comments}</main>`,true);
}
function supportPage(env, signedIn) {
  return page('Поддержать', `<main class="wrap"><h1 class="support-title">Поддержать</h1><div class="support-grid"><section><h2>Реквизиты</h2><p class="support-details">${escapeHTML(env.SUPPORT_DETAILS || 'Реквизиты для поддержки проекта появятся здесь.')}</p></section><section><h2>Связаться с автором</h2><dl><dt>Instagram</dt><dd>${escapeHTML(env.SUPPORT_INSTAGRAM || 'Юзернейм появится здесь')}</dd><dt>Почта</dt><dd>${escapeHTML(env.SUPPORT_EMAIL || 'Адрес появится здесь')}</dd><dt>Telegram-канал</dt><dd>${escapeHTML(env.SUPPORT_TELEGRAM || 'Адрес канала появится здесь')}</dd></dl></section></div></main>`,signedIn);
}
function discussion(film, comments, { verified, emailEnabled, challenge, notice }) {
  const path = '/film/' + film.id;
  const identity = verified
    ? '<p>Вы вошли по почте. Адрес скрыт от зрителей.</p><form method="post" action="' + path + '/email-logout"><button class="secondary">Выйти из почты</button></form>'
    : emailEnabled
      ? `<details${challenge || notice ? ' open' : ''}><summary>Подтвердить почту</summary>${challenge
        ? `<form method="post" action="${path}/verify"><label for="email-code">Код из письма</label><input id="email-code" name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" required><button>Подтвердить код</button></form>`
        : ''}<form method="post" action="${path}/email"><label for="email">Электронная почта</label><input id="email" name="email" type="email" autocomplete="email" maxlength="254" required><button class="secondary">Отправить код</button></form></details>`
      : '<p>Вход по почте пока недоступен. Можно оставить комментарий как гость.</p>';
  return `<section id="comments" class="discussion"><h2>Комментарии</h2>${notice ? `<p role="status">${escapeHTML(notice)}</p>` : ''}${identity}<form method="post" action="${path}/comment"><label for="comment-name">Ваше имя</label><input id="comment-name" name="name" maxlength="60" required><label for="comment-text">Комментарий</label><textarea id="comment-text" name="text" rows="4" maxlength="1500" required></textarea><button>Опубликовать</button></form><div class="messages">${comments.length
    ? comments.map(comment => `<article><strong>${escapeHTML(comment.name)}</strong> <span class="tag">${comment.verified ? 'Почта подтверждена' : 'Гость'}</span><p>${escapeHTML(comment.text)}</p></article>`).join('')
    : '<p>Комментариев пока нет.</p>'}</div></section>`;
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
const maxUpload = 90 * 1024 * 1024;
const maxCover = 512 * 1024;
const escapeHTML = (value) => value.replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
})[char]);
function uploadedFilm(object) {
  const id = object.key.slice('films/'.length);
  return {
    id,
    cover:object.customMetadata.hasCover === '1' ? '/film-cover/'+id : '/cover.webp',
    title:escapeHTML(object.customMetadata.title),
    rawTitle:object.customMetadata.title,
    description:escapeHTML(object.customMetadata.description),
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
  const form = signedIn ? `<form id="upload"><label for="title">Название</label><input id="title" name="title" required maxlength="120"><label for="description">Описание</label><textarea id="description" name="description" required maxlength="800" rows="4"></textarea><label for="movie">Файл MP4, до 90 МБ</label><input id="movie" type="file" accept=".mp4,video/mp4" required><fieldset><legend>Обложка фильма</legend><div class="cover-options" id="cover-options"><label><input type="radio" name="cover" value="default" checked>Стандартная<img src="/cover.webp" alt=""></label></div><p id="cover-status" role="status">Выберите MP4, чтобы увидеть кадры из фильма.</p></fieldset><button>Загрузить фильм</button></form><p id="upload-status" role="status"></p>
<script>
const form = document.getElementById('upload');
const status = document.getElementById('upload-status');
const movie = document.getElementById('movie');
const coverOptions = document.getElementById('cover-options');
const coverStatus = document.getElementById('cover-status');
const submit = form.querySelector('button');
const frames = [];
function resetCovers() {
  for(const frame of frames) URL.revokeObjectURL(frame.url);
  frames.length = 0;
  while(coverOptions.children.length > 1) coverOptions.lastElementChild.remove();
  coverOptions.querySelector('input').checked = true;
  coverStatus.textContent = 'Выберите MP4, чтобы увидеть кадры из фильма.';
}
function waitForVideo(video, event, action) {
  return new Promise((resolve, reject) => {
    const listeners = new AbortController();
    const timeout = setTimeout(() => finish(new Error('Video timeout')), 5000);
    function finish(error) {
      clearTimeout(timeout);
      listeners.abort();
      if(error) reject(error);
      else resolve();
    }
    video.addEventListener(event, () => finish(), {signal:listeners.signal});
    video.addEventListener('error', () => finish(new Error('Video error')), {signal:listeners.signal});
    action();
  });
}
movie.addEventListener('change', async () => {
  resetCovers();
  const file = movie.files[0];
  if(!file || !file.size || file.size > ${maxUpload} || !file.name.toLowerCase().endsWith('.mp4')) return;
  submit.disabled = movie.disabled = true;
  coverStatus.textContent = 'Подбираем кадры…';
  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  const source = URL.createObjectURL(file);
  try {
    await waitForVideo(video, 'loadeddata', () => { video.src = source; });
    if(!Number.isFinite(video.duration) || !video.videoWidth) throw new Error('Invalid video');
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 640 / Math.max(video.videoWidth, video.videoHeight));
    canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
    canvas.height = Math.max(1, Math.round(video.videoHeight * scale));
    const context = canvas.getContext('2d');
    for(const fraction of [0.15, 0.35, 0.55, 0.75]) {
      const time = video.duration * fraction;
      await waitForVideo(video, 'seeked', () => { video.currentTime = time; });
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.85));
      if(!blob || blob.size > ${maxCover}) continue;
      const url = URL.createObjectURL(blob);
      const index = frames.push({blob,url}) - 1;
      const label = document.createElement('label');
      const radio = Object.assign(document.createElement('input'), {type:'radio',name:'cover',value:String(index)});
      const image = Object.assign(document.createElement('img'), {src:url,alt:''});
      label.append(radio, 'Кадр ' + (index + 1), image);
      coverOptions.append(label);
    }
  } catch {
    // The default cover is still available if the browser cannot decode the MP4.
  } finally {
    video.removeAttribute('src');
    video.load();
    URL.revokeObjectURL(source);
    coverStatus.textContent = frames.length ? 'Выберите обложку для каталога.' : 'Не удалось получить кадры. Доступна стандартная обложка.';
    submit.disabled = movie.disabled = false;
  }
});
form.addEventListener('submit', async event => {
  event.preventDefault();
  if(submit.disabled) return;
  const file = movie.files[0];
  if(!file || !file.size || file.size > ${maxUpload} || !file.name.toLowerCase().endsWith('.mp4')) {
    status.textContent = 'Выберите файл MP4 размером до 90 МБ.';
    return;
  }
  submit.disabled = movie.disabled = true;
  status.textContent = 'Фильм загружается…';
  try {
    const fields = new FormData(form);
    const metadata = {title:fields.get('title'),description:fields.get('description')};
    const cover = frames[fields.get('cover')]?.blob;
    const response = await fetch('/admin/upload', {method:'POST',headers:{
      'Content-Type':'video/mp4',
      'X-Film-Metadata':encodeURIComponent(JSON.stringify(metadata)),
      'X-Film-Size':String(file.size),
      'X-Film-Cover-Size':String(cover?.size ?? 0)
    },body:cover ? new Blob([cover,file]) : file});
    if(!response.ok) throw new Error(response.status === 401 ? 'Сеанс истёк. Войдите снова.' : 'Не удалось загрузить фильм.');
    form.reset();
    resetCovers();
    status.textContent = 'Фильм добавлен в каталог.';
  } catch(error) {
    status.textContent = error.message || 'Не удалось загрузить фильм.';
  } finally {
    submit.disabled = movie.disabled = false;
  }
});
</script>` : `<form method="post" action="/admin"><label for="user">Логин</label><input id="user" name="user" required maxlength="128" autocomplete="username"><label for="password">Пароль</label><input id="password" name="password" type="password" required maxlength="128" autocomplete="current-password"><button>Войти</button></form>`;
  return page('Администрирование', `<main class="wrap"><section class="administration"><a href="/">К кинотеатру</a><img class="admin-photo" src="/admin.webp" alt="Мартин Скорсезе — Absolute Cinema"><h2>${signedIn ? 'Загрузка фильма' : 'Вход администратора'}</h2>${error ? `<p class="error" role="alert">${error}</p>` : ''}${signedIn && !bucket ? '<p>Хранилище фильмов временно недоступно.</p>' : form}${signedIn ? '<form method="post" action="/admin/logout"><button class="secondary">Выйти из панели</button></form>' : ''}</section></main>`);
}
async function saveFilm(request, bucket) {
  if(!bucket) return new Response(null,{status:503});
  const length = Number(request.headers.get('X-Film-Size'));
  const coverLength = Number(request.headers.get('X-Film-Cover-Size'));
  if(!Number.isSafeInteger(coverLength) || coverLength < 0 || coverLength > maxCover) return new Response(null,{status:413});
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
  const coverKey = 'covers/'+id;
  const metadata = {title,description};
  let body = request.body;
  if(coverLength) {
    const cover = new Uint8Array(coverLength);
    let position = 0;
    const split = new TransformStream({
      async transform(chunk, controller) {
        if(position < cover.length) {
          const used = Math.min(chunk.length, cover.length-position);
          cover.set(chunk.subarray(0,used),position);
          position += used;
          chunk = chunk.subarray(used);
          if(position === cover.length) {
            if(cover[0] !== 255 || cover[1] !== 216 || cover[2] !== 255) throw new Error('Invalid JPEG cover');
            await bucket.put(coverKey,cover,{httpMetadata:{contentType:'image/jpeg'}});
          }
        }
        if(chunk.length) controller.enqueue(chunk);
      },
    });
    body = body.pipeThrough(split);
    metadata.hasCover = '1';
  }
  const abort = new AbortController();
  const transfer = body.pipeTo(stream.writable,{signal:abort.signal});
  const storage = bucket.put('films/'+id,stream.readable,{customMetadata:metadata,httpMetadata:{contentType:'video/mp4'}});
  try {
    await Promise.all([transfer,storage]);
  } catch(error) {
    abort.abort();
    await Promise.allSettled([transfer,storage]);
    if(coverLength) await bucket.delete(coverKey);
    throw error;
  }
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
function cookieValue(request, name) {
  return request.headers.get('Cookie')?.split(';').map(part => part.trim()).find(part => part.startsWith(name+'='))?.slice(name.length+1) ?? '';
}
function communityCookie(request, name, value, age) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return name+'='+value+'; Path=/; HttpOnly; SameSite=Strict; Max-Age='+age+secure;
}
async function verifiedAuthor(request, secret) {
  const [expires, id, proof] = cookieValue(request,'youngcc_author').split('.');
  return /^\d{10}$/.test(expires) && Number(expires) > Date.now()/1000
    && Boolean(id && proof && equal(proof,await signature(secret,'author:'+expires+'.'+id)));
}
async function communityForm(request) {
  const reader = request.body?.getReader();
  const decoder = new TextDecoder();
  let length = 0;
  let text = '';
  if(!reader) return null;
  while(true) {
    const {done,value} = await reader.read();
    if(done) return new URLSearchParams(text + decoder.decode());
    length += value.length;
    if(length > 24_000) {
      await reader.cancel();
      return null;
    }
    text += decoder.decode(value,{stream:true});
  }
}
async function renderDiscussion(request, env, film, notice = '', challenge = '') {
  const comments = await env.COMMUNITY.comments(film.id);
  return filmPage(film, discussion(film,comments,{
    verified:await verifiedAuthor(request,env.SESSION_SECRET),
    emailEnabled:env.COMMUNITY.emailEnabled, challenge, notice,
  }));
}
async function postDiscussion(request, env, id, action) {
  const {COMMUNITY:community,SESSION_SECRET:secret} = env;
  if(!community || !env.BUCKET) return new Response(null,{status:404});
  if(!await authenticated(request,secret)) return new Response(null,{status:401});
  const film = await env.BUCKET.head('films/'+id);
  if(!film) return new Response(null,{status:404});
  const form = await communityForm(request);
  if(!form) return new Response(null,{status:400});
  const location = '/film/'+id+'#comments';
  const back = (cookie) => new Response(null,{status:303,headers:{
    Location:location,'Cache-Control':'no-store',...(cookie ? {'Set-Cookie':cookie} : {}),
  }});
  const challenge = cookieValue(request,'youngcc_challenge');
  const show = (notice, pending = '') => renderDiscussion(request,env,uploadedFilm(film),notice,pending);
  if(action === 'comment') {
    const name = form.get('name')?.trim() ?? '';
    const text = form.get('text')?.trim() ?? '';
    if(!name || name.length > 60 || !text || text.length > 1500) return show('Укажите имя и комментарий длиной до 1500 символов.');
    await community.comment(id,{name,text,verified:await verifiedAuthor(request,secret)});
    return back();
  }
  if(action === 'email-logout') return back(communityCookie(request,'youngcc_author','',0));
  if(!community.emailEnabled) return new Response(null,{status:503});
  if(action === 'email') {
    const email = form.get('email')?.trim().toLowerCase() ?? '';
    if(email.length > 254 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(email)) return show('Укажите действительный адрес почты.',challenge);
    const result = await community.sendCode(email);
    if(typeof result === 'string') return show(result,challenge);
    const response = await show('Код отправлен. Проверьте почту.',result.id);
    response.headers.set('Set-Cookie',communityCookie(request,'youngcc_challenge',result.id,600));
    return response;
  }
  const code = form.get('code') ?? '';
  if(!/^\d{6}$/.test(code) || !community.verifyCode(challenge,code)) return show('Код неверен или истёк. Проверьте код или запросите новый.',challenge);
  const age = 8*60*60;
  const expires = Math.floor(Date.now()/1000)+age;
  const session = expires+'.'+crypto.randomUUID();
  return back(communityCookie(request,'youngcc_author',session+'.'+await signature(secret,'author:'+session),age));
}
export default {async fetch(request, env) {
  const url = new URL(request.url);
  const {pathname} = url;
  if(Object.hasOwn(IMAGES,pathname) && ['GET','HEAD'].includes(request.method)) {
    const body = request.method === 'HEAD' ? null : Uint8Array.from(atob(IMAGES[pathname]), c=>c.charCodeAt(0));
    return new Response(body,{headers:{'Content-Type':'image/webp','Cache-Control':'public, max-age=3600'}});
  }
  const {ACCESS_CODE:code,SESSION_SECRET:secret} = env;
  if(pathname === '/support' && ['GET','HEAD'].includes(request.method)) return supportPage(env,Boolean(secret && await authenticated(request,secret)));
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
    const discussionAction = /^\/film\/([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})\/(comment|email|verify|email-logout)$/.exec(pathname);
    if(discussionAction) return postDiscussion(request,env,discussionAction[1],discussionAction[2]);
    if(pathname === '/logout') {
      const response = redirect(request,'',0);
      response.headers.append('Set-Cookie',communityCookie(request,'youngcc_author','',0));
      response.headers.append('Set-Cookie',communityCookie(request,'youngcc_challenge','',0));
      return response;
    }
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
  if(pathname === '/' || pathname === '/login') return signedIn ? catalog(await listUploads(env.BUCKET),(url.searchParams.get('q') ?? '').trim().slice(0,120)) : gate();
  if(!signedIn) return new Response(null,{status:401,headers:{'Cache-Control':'no-store'}});
  const [,route,id] = pathname.split('/');
  if(env.BUCKET && ['film','video','film-cover'].includes(route) && /^[a-f0-9-]{36}$/.test(id) && pathname === `/${route}/${id}`) {
    const object = await env.BUCKET.head('films/'+id);
    if(object && route === 'film') {
      const film = uploadedFilm(object);
      return env.COMMUNITY ? renderDiscussion(request,env,film,'',cookieValue(request,'youngcc_challenge')) : filmPage(film);
    }
    if(object && route === 'video') return uploadedVideo(request,env.BUCKET,object);
    if(object?.customMetadata.hasCover === '1' && route === 'film-cover') {
      const key = 'covers/'+id;
      const cover = await (request.method === 'HEAD' ? env.BUCKET.head(key) : env.BUCKET.get(key));
      if(cover) return new Response(cover.body ?? null,{headers:{'Content-Type':'image/jpeg','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
    }
  }
  return page('Страница не найдена','<main class="wrap"><h2>Страница не найдена</h2><a href="/">Вернуться в каталог</a></main>',true,404);
}};
const IMAGES = {};
