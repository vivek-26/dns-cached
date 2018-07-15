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

  test('cache store has ttl and cache properties', () => {
    const cacheObj = createCacheStore(1);
    expect(cacheObj).toMatchObject({ ttl: 60000 });
    expect(cacheObj).toHaveProperty('cache');
    expect(typeof cacheObj.cache).toBe('object');
  });

  test('cache store methods - has, get, set', () => {
    const cacheObj = createCacheStore(1);
    const key = 'test';
    const value = 'value';
    cacheObj.set(key, value);
    expect(cacheObj.cache).toMatchObject({ test: 'value' });
    expect(cacheObj.has(key)).toBeTruthy();
    expect(cacheObj.get(key)).toBe(value);
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
