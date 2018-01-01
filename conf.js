const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    framework: 'jasmine',
    directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/spec.js'],
    capabilities: {
        browserName: 'firefox'
    },
    jasmineNodeOpts: { print: function() {} },
    onPrepare: function () {
        jasmine.getEnv().addReporter(new SpecReporter({
          spec: {
            displayStacktrace: true
          }
        }));
      }
}