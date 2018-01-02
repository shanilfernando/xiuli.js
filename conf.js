const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  framework: 'jasmine',
  directConnect: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/spec.js'],
  capabilities: {
    browserName: 'firefox',
  },
  jasmineNodeOpts: { print() {}, defaultTimeoutInterval: 30000 },
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true,
      },
    }));
  },
};
