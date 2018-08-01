/**
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @overview Utility Function - Pick.
 * @copyright Vivek Kumar 2018
 * @license MIT
 */

/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */

/**
 * Utility function to safely access deeply nested properties of an object
 * @param {object} obj Object to pick property from.
 * @param {array} pathArr
 * @returns {object|undefined} Object property value or undefined.
 */
const pick = (obj, pathArr) =>
  pathArr.reduce(
    (prev, curr) => (prev && prev[curr] ? prev[curr] : undefined),
    obj,
  );

/**
 * Utility function to check for valid numbers.
 * @param {number} n The number to be validated.
 * @returns {true|false}
 */
const isNumeric = (n) => !Number.isNaN(parseFloat(n)) && Number.isFinite(n);

module.exports = { pick, isNumeric };
