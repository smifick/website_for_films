import { createHmac, randomInt, randomUUID, timingSafeEqual } from 'node:crypto';
import { mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export function createCommunity(data, secret, { clientId, clientSecret, refreshToken, mailFrom }) {
  const challenges = new Map();
  const sends = [];
  const timeout = 10 * 60 * 1000;
  const codeDigest = (id, code) => createHmac('sha256', secret).update(id + ':' + code).digest();
  const emailEnabled = Boolean(clientId && clientSecret && refreshToken && mailFrom);
  return {
    emailEnabled,
    async sendCode(email) {
      const now = Date.now();
      for (const [id, challenge] of challenges) {
        if (challenge.expires <= now) challenges.delete(id);
        else if (challenge.email === email) {
          if (now - challenge.sent < 60_000) return 'Подождите минуту перед повторной отправкой.';
        }
      }
      while (sends.length && sends[0] <= now - timeout) sends.shift();
      if (sends.length >= 30) return 'Слишком много запросов. Попробуйте позже.';
      sends.push(now);
      const id = randomUUID();
      const code = String(randomInt(1_000_000)).padStart(6, '0');
      challenges.set(id, { email, sent: now, expires: now + timeout, attempts: 0, digest: codeDigest(id, code) });
      try {
        const token = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: 'refresh_token' }),
          signal: AbortSignal.timeout(8000),
        });
        if (!token.ok) throw new Error('Mail authorization failed');
        const { access_token: accessToken } = await token.json();
        const message = [
          'From: ' + mailFrom, 'To: ' + email, 'Subject: youngcinemaclub login code',
          'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8', '',
          'Ваш код входа: ' + code + '. Он действует 10 минут.',
        ].join('\r\n');
        const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
          body: JSON.stringify({ raw: Buffer.from(message).toString('base64url') }),
          signal: AbortSignal.timeout(8000),
        });
        if (!response.ok) throw new Error('Mail rejected');
      } catch {
        challenges.delete(id);
        return 'Не удалось отправить письмо. Попробуйте позже.';
      }
      return { id };
    },
    verifyCode(id, code) {
      const challenge = challenges.get(id);
      if (!challenge || challenge.expires <= Date.now()) return null;
      challenge.attempts += 1;
      const valid = timingSafeEqual(challenge.digest, codeDigest(id, code));
      if (valid || challenge.attempts >= 5) challenges.delete(id);
      return valid ? challenge.email : null;
    },
    async comments(film) {
      const folder = join(data, 'comments', film);
      const files = await readdir(folder).catch(error => {
        if (error.code === 'ENOENT') return [];
        throw error;
      });
      const latest = files.filter(file => file.endsWith('.json')).sort().reverse().slice(0, 100);
      return Promise.all(latest.map(async file => JSON.parse(await readFile(join(folder, file), 'utf8'))));
    },
    async comment(film, comment) {
      const folder = join(data, 'comments', film);
      await mkdir(folder, { recursive: true, mode: 0o700 });
      const name = join(folder, Date.now() + '-' + randomUUID());
      await writeFile(name + '.tmp', JSON.stringify(comment), { flag: 'wx', mode: 0o600 });
      await rename(name + '.tmp', name + '.json');
    },
  };
}
