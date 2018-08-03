/**
 * Tests for Cache Module
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @copyright Vivek Kumar 2018
 * @license MIT
 */
import createCacheStore from '../src/cache';

describe('Cache Store Tests', () => {
  test('createCacheStore fn returns a new instance of CacheStore', () => {
    expect(createCacheStore().constructor.name).toBe('CacheStore');
  });

  test('default value for ttl is 1 min', () => {
    expect(createCacheStore()).toMatchObject({ ttl: 60000 });
  });

  test('cache store has ttl, cache, maxSize, cacheSize properties', () => {
    const cacheObj = createCacheStore(1, { maxSize: 1 });
    expect(cacheObj).toMatchObject({ ttl: 60000 });
    expect(cacheObj).toHaveProperty('cache');
    expect(typeof cacheObj.cache).toBe('object');
    expect(cacheObj.maxSize).toBe(1);
    expect(cacheObj.getSize()).toBe(0);
  });

  test('default value of maxSize is 1000', () => {
    const cacheObj = createCacheStore(1, { maxSize: 'invalid' });
    expect(cacheObj.maxSize).toBe(1000);
  });

  test('cache store methods - has, get, set, getSize', () => {
    const cacheObj = createCacheStore(1);
    const key = 'test';
    const value = 'value';
    cacheObj.set(key, value);
    expect(cacheObj.cache).toMatchObject({ test: 'value' });
    expect(cacheObj.has(key)).toBeTruthy();
    expect(cacheObj.get(key)).toBe(value);
    expect(typeof cacheObj.getSize()).toBe('number');
  });

  test('expired cache items are removed', (done) => {
    const cacheObj = createCacheStore(0.0008); /* ttl - 480ms */
    const key = 'test';
    const value = 'value';
    cacheObj.set(key, value);

    setTimeout(() => {
      expect(cacheObj.has(key)).toBeFalsy();
      done();
    }, 500);
  });
});
