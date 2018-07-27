/**
 * Tests for Cached DNS Module
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @copyright Vivek Kumar 2018
 * @license MIT
 */
import * as memoizeDns from '../src/cached-dns/memoize-dns';
import dnsCached from '../src/cached-dns';

describe('CachedDNS Module Tests', () => {
  const cachedDns = dnsCached(0.00083);

  test('dnsCached returns a new instance of CachedDNS', () => {
    expect(cachedDns.constructor.name).toBe('CachedDNS');
  });

  /* An instance is already created above */
  test('Multiple instances of CachedDNS cannot be created', () => {
    expect(dnsCached).toThrow(/already has an instance!/);
  });

  test('overrideMethods calls all necessary methods', () => {
    const getAllDnsMethodsMock = jest.spyOn(memoizeDns, 'getAllDnsMethods');
    const memoizeDnsMethodsMock = jest.spyOn(memoizeDns, 'memoizeDnsMethods');

    expect(cachedDns.overrideMethods()).toBeTruthy();

    expect(getAllDnsMethodsMock).toHaveBeenCalledTimes(1);
    expect(memoizeDnsMethodsMock).toHaveBeenCalledTimes(1);
  });
});
