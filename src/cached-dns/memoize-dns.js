import dns from 'dns';

/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */

/**
 * Function to get all methods on DNS instance.
 * @returns {array} Array of all method names present in DNS instance.
 */
export const getAllDnsMethods = () =>
  Object.keys(dns).filter(
    (key) => dns[key].constructor && dns[key].call && dns[key].apply,
  );

/**
 * Function to accept a DNS method and memoize it.
 * @param {function} fn Function to be memoized.
 * @param {object} cacheObj The cache object. Instance of CacheStore Class.
 * @returns {function} Memoized DNS Method.
 */
const memoize = (fn, cacheObj) => {
  return function memoized(...args) {
    const key = JSON.stringify(args);
    const originalCb = args.pop();

    if (this.has(key)) {
      return originalCb(null, ...this.get(key));
    }

    /* Overridden callback */
    args.push((err, ...values) => {
      /* istanbul ignore if */
      if (err) {
        return originalCb(err);
      }

      /* Set result on cache object */
      this.set(key, values);
      return originalCb(err, ...values);
    });

    return fn(...args);
  }.bind(cacheObj);
};

/**
 * Function to accept a list of DNS method names and call @func memoize
 * @param {array} methods List of DNS methods to be meoized.
 * @param {object} cacheObj The cache object. Instance of CacheStore Class.
 */
export const memoizeDnsMethods = (methods = [], cacheObj) => {
  methods.forEach((m) => {
    dns[m] = memoize(dns[m], cacheObj);
  });
};
