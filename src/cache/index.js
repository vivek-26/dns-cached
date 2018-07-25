/**
 * @module Cache
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @overview Cache Store Implementation.
 * @copyright Vivek Kumar 2018
 * @license MIT
 */

/** Cache Store Class */
class CacheStore {
  /**
   * Creates an instance of CacheStore.
   * @param {number} [ttl=1] TTL value for cache items in minutes.
   * @memberof CacheStore
   */
  constructor(ttl = 1) {
    /* Convert `ttl` from minutes to milliseconds. */
    this.ttl = ttl * 60 * 1000;
    this.cache = Object.create(null);
  }

  /**
   * Check whether `key` is present in cache object.
   * @param {string} key
   * @returns {boolean}
   * @memberof CacheStore
   */
  has(key) {
    return key in this.cache;
  }

  /**
   * Get `key` from cache object.
   * @param {string} key
   * @returns {any}
   * @memberof CacheStore
   */
  get(key) {
    return this.cache[key];
  }

  /**
   * Set `key` with `value` on cache object.
   * Cache Expiry is also handled in this method.
   * @param {string} key
   * @param {any} value
   * @memberof CacheStore
   */
  set(key, value) {
    this.cache[key] = value;

    /* Handle cache expiry */
    setTimeout(() => delete this.cache[key], this.ttl);
  }
}

/* eslint-disable arrow-parens */
/**
 * Function to create a new instance of Cache Store.
 * @param {number} ttl TTL value for cache items in minutes.
 * @returns {object} Instance of CacheStore class.
 */
const createCacheStore = (ttl) => new CacheStore(ttl);
/* eslint-enable arrow-parens */

export default createCacheStore;
