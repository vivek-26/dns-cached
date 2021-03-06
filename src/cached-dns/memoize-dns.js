import dns from 'dns';

/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */

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
 * @param {string} method Function name to be memoized.
 * @param {function} fn Function to be memoized.
 * @param {object} cacheObj The cache object. Instance of CacheStore Class.
 * @returns {function} Memoized DNS Method.
 */
const memoize = (method, fn, cacheObj) => {
  return function memoized(...args) {
    const originalCb = args.pop();
    /* Serialize Arguments */
    const key = `${method}_${JSON.stringify(args)}`;

    if (this.has(key)) {
      process.nextTick(() => originalCb(null, ...this.get(key)));
    } else if (this.queue[key]) {
      this.queue[key].push(originalCb);
    } else if (this.getSize() >= this.maxSize) {
      /* Max cache size check */
      args.push(originalCb);
      return fn(...args);
    } else {
      this.queue[key] = [originalCb];
      this.cacheSize += 1;

      /* Overridden callback */
      const overrideCb = (err, ...values) => {
        /* istanbul ignore if */
        if (err) {
          this.cacheSize -= 1;
          return originalCb(err);
        }

        /* Set result on cache object */
        this.set(key, values);

        /* Clear the queue for resolved key */
        const q = this.queue[key];
        delete this.queue[key];
        let i = q.length;
        let j = 0;
        while (i--) {
          q[j++].call(null, err, ...values);
        }
      };

      args.push(overrideCb);
      return fn(...args);
    }
  }.bind(cacheObj);
};

/**
 * Function to accept a list of DNS method names and call @func memoize
 * The DNS methods are overridden by their memoized version.
 * @param {array} methods List of DNS methods to be memoized.
 * @param {object} cacheObj The cache object. Instance of CacheStore Class.
 */
export const memoizeDnsMethods = (methods = [], cacheObj) => {
  methods.forEach((m) => {
    dns[m] = memoize(m, dns[m], cacheObj);
  });
};
