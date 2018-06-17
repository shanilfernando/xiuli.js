const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { uglify } = require('rollup-plugin-uglify');
const eslint = require('rollup-plugin-eslint');
const filesize = require('rollup-plugin-filesize');
const pkg = require('./package.json');


module.exports = [
  // browser-friendly UMD build
  {
    input: 'src/main.js',
    output: [
      {
        file: 'docs/assets/js/xiuli.js', format: 'umd', name: 'Xiuli', sourcemap: true,
      },
      {
        file: pkg.browser, format: 'umd', name: 'Xiuli', sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      eslint(),
      babel({
        exclude: ['node_modules/**'],
      }),
      filesize(),
    ],
  },
  // min build
  {
    input: 'src/main.js',
    output: [
      {
        file: 'docs/assets/js/xiuli.min.js', format: 'umd', name: 'Xiuli', sourcemap: true,
      },
      {
        file: 'dist/xiuli.min.js', format: 'umd', name: 'Xiuli', sourcemap: true,
      },
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      babel({
        exclude: ['node_modules/**'],
      }),
      uglify(),
      filesize(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    input: 'src/main.js',
    external: [],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      resolve(),
      babel({
        exclude: ['node_modules/**'],
      }),
      filesize(),
    ],
  },
];
