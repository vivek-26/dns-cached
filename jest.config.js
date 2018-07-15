/**
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @file Manages Jest Configuration.
 * @copyright Vivek Kumar 2018
 * @license MIT
 */
module.exports = {
  testRegex: 'tests/.*\\.(js)$',
  collectCoverageFrom: ['src/**/*.{js}', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
