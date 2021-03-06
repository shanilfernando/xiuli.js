/* global jasmine */
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  framework: 'jasmine',
  directConnect: true,
  specs: ['test/xiuli.spec.js'],
  maxSessions: 1,
  multiCapabilities: [
/*     {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['--headless'],
      },
    }
    , */
    {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--headless'],
      },
    }],
  jasmineNodeOpts: { print() { }, defaultTimeoutInterval: 30000 },
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: false,
      },
    }));
  },
};
