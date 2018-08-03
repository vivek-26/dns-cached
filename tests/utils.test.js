/**
 * Tests for Utils Module
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @copyright Vivek Kumar 2018
 * @license MIT
 */
import { pick, isNumeric } from '../src/utils';

describe('Utils Tests', () => {
  describe('pick function tests', () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } } };

    test('pick returns deeply nested values correctly', () => {
      expect(pick(obj, ['a'])).toBe(1);
      expect(pick(obj, ['b', 'c'])).toBe(2);
      expect(pick(obj, ['b', 'd', 'e'])).toBe(3);
    });

    test("pick returns undefined when deeply nested value isn't found", () => {
      expect(pick(obj, ['b', 'd', 'f'])).toBe(undefined);
    });
  });

  describe('isNumeric function tests', () => {
    test('isNumeric returns true for valid numbers', () => {
      expect(isNumeric(1)).toBeTruthy();
      expect(isNumeric(1.3)).toBeTruthy();
    });

    test('isNumeric returns false for invalid numbers', () => {
      expect(isNumeric('1')).toBeFalsy();
      expect(isNumeric('1a')).toBeFalsy();
    });
  });
});
