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
class CachedDNS {
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

    /* Create Cache Store Object (Static) */
    CachedDNS.cacheObj = createCacheStore(ttl, config);
  }

  /**
   * Override all DNS Methods.
   * @returns {boolean}
   * @memberof CachedDNS
   */
  overrideMethods() {
    memoizeDnsMethods(getAllDnsMethods(), CachedDNS.cacheObj);
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
