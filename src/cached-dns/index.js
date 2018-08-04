/**
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @overview DNS Cache Memoized.
 * @copyright Vivek Kumar 2018
 * @license MIT
 */
import createCacheStore from '../cache';
import { getAllDnsMethods, memoizeDnsMethods } from './memoize-dns';

/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-parens */

/** Cached DNS Class - Override DNS Methods */
export class CachedDNS {
  /**
   * Creates an instance of CachedDNS.
   * @param {number} [ttl] TTL value for cache items in minutes.
   * @param {object} [config] Config / Options object.
   * @param {number} [config.maxSize] Maximum number of items to be stored in cache.
   * @memberof CachedDNS
   */
  constructor(ttl, config) {
    /* Allow only one instance of CachedDNS class */
    if (CachedDNS.$instance) {
      throw new Error('CachedDNS Class already has an instance!');
    }

    CachedDNS.$instance = this;

    this.methods = null;

    /* Create Cache Store Object (Static) */
    CachedDNS.cacheObj = createCacheStore(ttl, config);
  }

  /**
   * Override all DNS Methods.
   * @returns {boolean}
   * @memberof CachedDNS
   */
  overrideMethods(options) {
    const allDnsMethods = getAllDnsMethods();

    if (!options) {
      this.methods = allDnsMethods;
    } else if (typeof options === 'string') {
      if (allDnsMethods.includes(options)) {
        this.methods = [options];
      } else {
        throw new Error(`Invalid DNS Method - '${options}'`);
      }
    } else if (Array.isArray(options)) {
      if (options.every((m) => allDnsMethods.includes(m))) {
        this.methods = options;
      } else {
        throw new Error('An invalid dns method was passed');
      }
    } else {
      throw new TypeError('Expected a string or an array of strings');
    }

    memoizeDnsMethods(this.methods, CachedDNS.cacheObj);
    return true;
  }
}

/**
 * Function to create a new instance of CachedDNS class.
 * @param {number} ttl TTL value for cache items in minutes.
 * @param {object} config Config / Options object.
 * @param {number} config.maxSize Maximum number of items to be stored in cache.
 * @returns {object} Instance of CachedDNS class.
 */
const dnsCached = (ttl, config) => new CachedDNS(ttl, config);

export default dnsCached;
