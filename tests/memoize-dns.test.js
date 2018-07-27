/**
 * Tests for Memoize DNS Module
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @copyright Vivek Kumar 2018
 * @license MIT
 */
import dns from 'dns';

import {
  getAllDnsMethods,
  memoizeDnsMethods,
} from '../src/cached-dns/memoize-dns';

import createCacheStore from '../src/cache';

describe('Memoize DNS Module Tests', () => {
  test('getAllDnsMethods returns an array of strings', () => {
    const methods = getAllDnsMethods();

    expect(Array.isArray(methods)).toBeTruthy();

    methods.forEach((m) => {
      expect(typeof m).toEqual('string');
    });
  });

  test('getAllDnsMethods returns valid dns methods', () => {
    const methods = getAllDnsMethods();

    methods.forEach((m) => {
      expect(
        dns[m] && dns[m].constructor && dns[m].call && dns[m].apply,
      ).toBeTruthy();
    });
  });

  test('memoizeDnsMethods overrides dns methods', (done) => {
    const cacheObj = createCacheStore(0.00083); /* 500 ms */
    const methods = ['lookup'];
    memoizeDnsMethods(methods, cacheObj);

    dns.lookup('google.com', { all: true }, () => {
      dns.lookup('google.com', { all: true }, () => {
        expect(cacheObj.getSize()).toBe(1);
        expect(Object.keys(cacheObj.cache)[0]).toMatch('google.com');
        done();
      });
    });
  });

  test('dns methods called in the same tick are queued', (done) => {
    const cacheObj = createCacheStore(0.00083); /* 500 ms */
    const methods = ['lookup'];
    memoizeDnsMethods(methods, cacheObj);

    dns.lookup('google.com', { all: true }, () => {});
    dns.lookup('google.com', { all: true }, () => {
      expect(cacheObj.getSize()).toBe(1);
      expect(Object.keys(cacheObj.cache)[0]).toMatch('google.com');
      expect(cacheObj.getQueueSize()).toBe(0);
      done();
    });
    expect(cacheObj.getQueueSize()).toBe(1);
  });
});
