/**
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @file JSDoc Configuration.
 * @copyright Vivek Kumar 2018
 * @license MIT
 */
module.exports = {
  plugins: ['plugins/markdown'],
  opts: {
    template: 'node_modules/ink-docstrap/template',
    encoding: 'utf8',
    destination: './docs/',
    recurse: true,
  },
  templates: {
    systemName: 'dns-cached',
    inverseNav: true,
    theme: 'flatly',
    copyright: 'Vivek Kumar 2018',
    dateFormat: 'dddd, MMMM Do YYYY, h:mm:ss a',
    linenums: true,
    outputSourceFiles: true,
  },
};
