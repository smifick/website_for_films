import { randomBytes, randomUUID, scrypt, timingSafeEqual } from 'node:crypto';
import { readFile, rename, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

const deriveKey = promisify(scrypt);
const attemptLimit = 5;
const lockTime = 15 * 60 * 1000;
export const adminSessionSeconds = 3600;

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = await deriveKey(password, salt, 64);
  return { salt, hash: hash.toString('hex') };
}

export async function createAdminAuth(data, user, initialPassword) {
  const path = join(data, 'admin-security.json');
  let state;
  try {
    state = JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    state = { password: await hashPassword(initialPassword), failures: 0, resetAt: 0 };
    await writeFile(path, JSON.stringify(state), { flag: 'wx', mode: 0o600 });
  }

  const sessions = new Map();
  let queue = Promise.resolve();
  function serialized(operation) {
    const result = queue.then(operation);
    queue = result.catch(() => {});
    return result;
  }
  async function save(next) {
    const temporary = path + '.' + randomUUID();
    try {
      await writeFile(temporary, JSON.stringify(next), { flag: 'wx', mode: 0o600 });
      await rename(temporary, path);
      state = next;
    } finally {
      await rm(temporary, { force: true });
    }
  }
  async function matches(password) {
    const key = await deriveKey(password, state.password.salt, 64);
    return timingSafeEqual(key, Buffer.from(state.password.hash, 'hex'));
  }
  async function checkCredentials(password, allowed = true) {
    const now = Date.now();
    const failures = state.resetAt > now ? state.failures : 0;
    if (failures >= attemptLimit) return { retryAfter: Math.ceil((state.resetAt - now) / 1000) };
    if (await matches(password) && allowed) return { valid: true };
    const count = failures + 1;
    const resetAt = count === attemptLimit || !failures ? now + lockTime : state.resetAt;
    await save({ ...state, failures: count, resetAt });
    return count === attemptLimit ? { retryAfter: Math.ceil(lockTime / 1000) } : { remaining: attemptLimit - count };
  }
  function active(token) {
    return (sessions.get(token) ?? 0) > Date.now();
  }
  return {
    active,
    login(name, password) {
      return serialized(async () => {
        const result = await checkCredentials(password, name === user);
        if (!result.valid) return result;
        const now = Date.now();
        if (state.failures) await save({ ...state, failures: 0, resetAt: 0 });
        for (const [token, expiry] of sessions) if (expiry <= now) sessions.delete(token);
        const token = randomBytes(32).toString('hex');
        sessions.set(token, now + adminSessionSeconds * 1000);
        return { token };
      });
    },
    logout(token, all = false) {
      return serialized(() => {
        if (all && active(token)) sessions.clear();
        else sessions.delete(token);
      });
    },
    changePassword(token, current, next) {
      return serialized(async () => {
        if (!active(token)) return {};
        const result = await checkCredentials(current);
        if (!result.valid) return result;
        if (!active(token)) return {};
        await save({ password: await hashPassword(next), failures: 0, resetAt: 0 });
        sessions.clear();
        return { changed: true };
      });
    },
  };
}
