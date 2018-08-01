/**
 * @module Cache
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @overview Cache Store Implementation.
 * @copyright Vivek Kumar 2018
 * @license MIT
 */
import { pick, isNumeric } from '../utils';

/* eslint-disable arrow-parens */

/** Cache Store Class */
class CacheStore {
  /**
   * Creates an instance of CacheStore.
   * @param {number} [ttl] TTL value for cache items in minutes.
   * @param {object} [config] Config / Options object.
   * @param {number} [config.maxSize] Maximum number of items to be stored in cache.
   * @memberof CacheStore
   */
  constructor(ttl, config) {
    /* Convert `ttl` from minutes to milliseconds. */
    this.ttl = (isNumeric(ttl) ? parseFloat(ttl) : 1) * 60 * 1000;
    this.cache = Object.create(null);
    this.queue = Object.create(null);
    this.maxSize = pick(config, ['maxSize'])
      ? Math.floor(config.maxSize) || 1000
      : 1000;
    this.cacheSize = 0;
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
    setTimeout(() => {
      delete this.cache[key];
      this.cacheSize -= 1;
    }, this.ttl);
  }

  /**
   * Get the number of elements present in cache object.
   * Useful for tests.
   * @returns {number} Number of elements in cache.
   * @memberof CacheStore
   */
  getSize() {
    return this.cacheSize;
  }

  /**
   * Get the number of elements present in queue.
   * Useful for tests.
   * @returns {number} Number of elements in queue.
   * @memberof CacheStore
   */
  getQueueSize() {
    return Object.keys(this.queue).length;
  }
}

/**
 * Function to create a new instance of Cache Store.
 * @param {number} [ttl] TTL value for cache items in minutes.
 * @param {object} [config] Config / Options object.
 * @param {number} [config.maxSize] Maximum number of items to be stored in cache.
 * @returns {object} Instance of CacheStore class.
 */
const createCacheStore = (ttl, config) => new CacheStore(ttl, config);

export default createCacheStore;
