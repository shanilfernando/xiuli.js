/* eslint prefer-destructuring: "off" */
const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const library = require('./package.json');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


const plugins = [];
let outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({
    minimize: true,
  }));
  outputFile = `${library.name  }.min.js`;
} else {
  plugins.push(new BrowserSyncPlugin({
    host: '0.0.0.0',
    port: 3000,
    server: {
      baseDir: ['docs'],
    },
  }));
  outputFile = `${library.name}.js`;
}

const config = {
  entry: `${__dirname}/src/index.js`,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: library.name,
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
