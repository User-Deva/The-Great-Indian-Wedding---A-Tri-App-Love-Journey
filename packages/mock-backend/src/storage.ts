import { MockDb } from './types';
import { buildSeedDb } from './seed';

const DB_KEY = 'tgiw:db:v1';

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function readDb(): MockDb {
  if (!isBrowser) return buildSeedDb();
  const raw = window.localStorage.getItem(DB_KEY);
  if (!raw) {
    const fresh = buildSeedDb();
    writeDb(fresh);
    return fresh;
  }
  try {
    return JSON.parse(raw) as MockDb;
  } catch {
    const fresh = buildSeedDb();
    writeDb(fresh);
    return fresh;
  }
}

export function writeDb(db: MockDb): void {
  if (!isBrowser) return;
  window.localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function resetDb(): MockDb {
  const fresh = buildSeedDb();
  writeDb(fresh);
  return fresh;
}
