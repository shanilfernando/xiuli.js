/* eslint func-names: "off" */

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'lib/**/*.js',
      'test/**/*.spec.js',
    ],
  });
};
