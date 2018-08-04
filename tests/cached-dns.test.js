/**
 * Tests for Cached DNS Module
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @copyright Vivek Kumar 2018
 * @license MIT
 */
import * as memoizeDns from '../src/cached-dns/memoize-dns';
import dnsCached, { CachedDNS } from '../src/cached-dns';

describe('CachedDNS Module Tests', () => {
  const cachedDns = dnsCached(0.00083);

  test('dnsCached returns a new instance of CachedDNS', () => {
    expect(cachedDns.constructor.name).toBe('CachedDNS');
  });

  /* An instance is already created above */
  test('Multiple instances of CachedDNS cannot be created', () => {
    expect(dnsCached).toThrow(/already has an instance!/);
  });

  test('overrideMethods memoizes all methods when options is empty', () => {
    CachedDNS.$instance = undefined;
    const cacheddns = new CachedDNS(0.00083);
    cacheddns.overrideMethods();
    expect(Array.isArray(cacheddns.methods)).toBeTruthy();
    expect(cacheddns.methods.length).toBe(memoizeDns.getAllDnsMethods().length);
  });

  test('overrideMethods memoizes a single method passed as string', () => {
    CachedDNS.$instance = undefined;
    const cacheddns = new CachedDNS(0.00083);
    cacheddns.overrideMethods('lookup');
    expect(Array.isArray(cacheddns.methods)).toBeTruthy();
    expect(cacheddns.methods.length).toBe(1);
  });

  test('overrideMethods memoizes throws an error when invalid function name is passed', () => {
    CachedDNS.$instance = undefined;
    const cacheddns = new CachedDNS(0.00083);
    expect(cacheddns.overrideMethods.bind(null, 'shouldthrowerror')).toThrow(
      /Invalid DNS Method/,
    );
  });

  test('overrideMethods memoizes multiple methods passes as an array', () => {
    CachedDNS.$instance = undefined;
    const cacheddns = new CachedDNS(0.00083);
    cacheddns.overrideMethods(['lookup', 'resolve', 'lookupService']);
    expect(Array.isArray(cacheddns.methods)).toBeTruthy();
    expect(cacheddns.methods.length).toBe(3);
  });

  test('overrideMethods memoizes throws error when an invalid method is present in array', () => {
    CachedDNS.$instance = undefined;
    const cacheddns = new CachedDNS(0.00083);
    expect(
      cacheddns.overrideMethods.bind(null, [
        'lookup',
        'resolve',
        'lookupServices',
      ]),
    ).toThrow(/An invalid dns method was passed/);
  });

  test('overrideMethods memoizes throws error when invalid type is passed as argument', () => {
    CachedDNS.$instance = undefined;
    const cacheddns = new CachedDNS(0.00083);
    expect(cacheddns.overrideMethods.bind(null, 12345)).toThrow(
      /Expected a string or an array of strings/,
    );
  });

  test('overrideMethods calls all necessary methods', () => {
    const getAllDnsMethodsMock = jest.spyOn(memoizeDns, 'getAllDnsMethods');
    const memoizeDnsMethodsMock = jest.spyOn(memoizeDns, 'memoizeDnsMethods');

    expect(cachedDns.overrideMethods()).toBeTruthy();

    expect(getAllDnsMethodsMock).toHaveBeenCalledTimes(1);
    expect(memoizeDnsMethodsMock).toHaveBeenCalledTimes(1);
  });
});
