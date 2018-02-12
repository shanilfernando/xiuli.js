/* eslint prefer-destructuring: "off" */
const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const library = require('./package.json');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


const plugins = [];

let outputFile = `${library.name}`;

/*   plugins.push(new UglifyJsPlugin({
    minimize: true,
  }));
  outputFile = `${library.name}.min`; */
/*   plugins.push(new BrowserSyncPlugin({
    host: '0.0.0.0',
    port: 5656,
    server: {
      baseDir: ['docs'],
    },
    files: ['docs/index.html'],
  })); */

/* const entry = {
  [`lib/${outputFile}`]: `${__dirname}/src/index.js`,
  [`docs/assets/js/${outputFile}`]: `${__dirname}/src/index.js`,
}; */
const entry = `${__dirname}/index.js`;

const config = {
  entry,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/`,
    filename: `${outputFile}.js`,
    library: library.name.charAt(0).toUpperCase() + library.name.slice(1),
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [{
      test: /(\.js)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /(\.js)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    },
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
  plugins,
};

module.exports = config;
