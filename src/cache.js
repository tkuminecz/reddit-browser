
const _cache = new Map()

function getItem (key) {
  if (_cache.has(key)) {
    return Promise.resolve(_cache.get(key).data)
  } else {
    throw new Error(`${key} not found in cache`)
  }
}

function setItem (key, data) {
  _cache.set(key, { data, timestamp: new Date() })
  return Promise.resolve(data)
}

module.exports = { getItem, setItem }
