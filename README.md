## dns-cached

#### Caching DNS Responses using Memoization technique.

[![Build Status](https://travis-ci.org/vivek-26/dns-cached.svg?branch=master)](https://travis-ci.org/vivek-26/dns-cached)
[![Coverage Status](https://coveralls.io/repos/github/vivek-26/dns-cached/badge.svg?branch=master)](https://coveralls.io/github/vivek-26/dns-cached?branch=master)

## Installation

`npm install dns-cached`

## Example

```js
const dnsCached = require('dns-cached');
const dns = require('dns');
const util = require('util');

const cache = dnsCached(5, { maxSize: 500 });
cache.overrideMethods('resolve'); /* Override/Memoize DNS Resolve */
const dnsResolve = util.promisify(dns.resolve);

async function run() {
  console.log('resolve("google.com")');
  for (let i = 0; i < 3; i++) {
    console.time('resolve');
    console.log('IP: ', await dnsResolve('google.com'));
    console.timeEnd('resolve');
  }
}
run().catch(console.error);
cache.flush(); /* Clear all timers */
```

```
% node index.js
resolve("google.com")
IP:  [ '172.217.161.14' ]
resolve: 47.908ms
IP:  [ '172.217.161.14' ]
resolve: 1.664ms
IP:  [ '172.217.161.14' ]
resolve: 0.173ms
```

## Usage

```js
const dnsCached = require('dns-cached');
/**
 * dnsCached(ttl, { maxSize })
 * ttl --> Time to live in minutes. Default: 1
 * maxSize --> Maximum number of items to store in cache. Default: 1000
 */
const cache = dnsCached(5, { maxSize: 500 });

/* Override/Memoize all dns methods */
cache.overrideMethods();

/* Override/Memoize a single dns method */
cache.overrideMethods('lookup');

/* Override/Memoize a list of dns methods */
cache.overrideMethods(['lookup', 'resolve']);

/* Flushing cache (if needed) */
cache.flush();
```

## Docs

[Click here](https://vivek-26.github.io/dns-cached/) to view project documentation.

## Running tests

`npm test` or `npm run test`

## Versioning

[SemVer](https://semver.org/) is used for versioning. For the versions available, see the [tags](https://github.com/vivek-26/dns-cached/tags) on this repository.

## License

This project is licensed under the `MIT License` - see the [LICENSE](https://github.com/vivek-26/dns-cached/blob/master/LICENSE) file for details.
