/* eslint prefer-destructuring: "off" */
const webpack = require('webpack');
const path = require('path');
const library = require('./package.json');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


const plugins = [];

const outputFile = `${library.name}.min`;

plugins.push(new UglifyJsPlugin({
  minimize: true,
}));

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
