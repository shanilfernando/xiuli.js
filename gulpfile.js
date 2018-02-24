/* eslint no-restricted-syntax: 0 */
/* eslint no-await-in-loop: 0 */
/* eslint camelcase: 0 */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const rollup = require('rollup');
const rollupConfigs = require('./rollup.config');
const { protractor, webdriver_update } = require('gulp-protractor');

gulp.task('build', async () => {
  for (const rollupConfig of rollupConfigs) {
    const bundle = await rollup.rollup({
      input: rollupConfig.input,
      plugins: rollupConfig.plugins,
    });

    rollupConfig.output.forEach(async (output) => {
      await bundle.write(output);
    });
  }
});

/* Testing */

gulp.task('protractor-install', webdriver_update);

gulp.task('server-start', ['build'], (done) => {
  browserSync.init({
    port: '5656',
    server: {
      baseDir: './docs/',
    },
    ghostMode: false,
    open: false,
  });
  done();
});

gulp.task('test', ['server-start', 'protractor-install'], (done) => {
  gulp.src(['./test/xiuli.spec.js'])
    .pipe(protractor({
      configFile: 'protractor.conf.js',
    }))
    .on('error', (e) => {
      browserSync.exit();
      throw e;
    })
    .on('end', () => {
      browserSync.exit();
      done();
    });
});

/* Development */

gulp.task('reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('default', ['build'], () => {
  browserSync.init({
    port: '5656',
    server: {
      baseDir: './docs/',
    },
  });

  gulp.watch(['src/**/*.js'], () => runSequence('build', 'reload'));
  gulp.watch(['docs/index.html'], ['reload']);
});
