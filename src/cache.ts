import config from '#/config'

const ENABLED = config.cache.defaultTTL
const DEFAULT_TTL = 10

interface Entry<A> {
  data: A,
  expires: number
}

const _cache = new Map<string, Entry<any>>()

const now = () => Math.floor(+ new Date() / 1000)

const expired = (expires) => now() <= expires

export function getItem<A> (key): Promise<A> {
  const entry: void | Entry<A> = _cache.has(key) && _cache.get(key)

  console.log(entry, now())

  if (ENABLED && entry && !expired(entry.expires)) {
    return Promise.resolve<A>(entry.data)
  } else {
    throw new Error(`${key} not found in cache`)
  }
}

export function setItem (key, data, ttl = DEFAULT_TTL) {
  if (ENABLED) {
    _cache.set(key, { data, expires: now() + ttl })
  }
  return Promise.resolve(data)
}
