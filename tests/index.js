/**
 * Tests for Index File
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @copyright Vivek Kumar 2018
 * @license MIT
 */
import dnsCached from '../src';

describe('Index File Tests', () => {
  test('Index file exports cached dns constructor', () => {
    expect(dnsCached(0.00083).constructor.name).toBe('CachedDNS');
  });
});
