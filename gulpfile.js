const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const { protractor, webdriver_update } = require('gulp-protractor');
const runSequence = require('run-sequence');

const { UglifyJsPlugin } = webpack.optimize;

gulp.task('beautify_build', () => gulp.src('index.js')
  .pipe(webpackStream(config))
  .pipe(gulp.dest('lib/'))
  .pipe(gulp.dest('docs/assets/js')));

gulp.task('uglify_build', () => {
  const minConfig = config;
  minConfig.plugins.push(new UglifyJsPlugin({
    minimize: true,
  }));
  minConfig.output.filename = 'xiuli.min.js';
  return gulp.src('index.js')
    .pipe(webpackStream(minConfig))
    .pipe(rename('xiuli.min.js'))
    .pipe(gulp.dest('lib/'))
    .pipe(gulp.dest('docs/assets/js'));
});

gulp.task('protractor-install', webdriver_update);

gulp.task('build', ['beautify_build', 'uglify_build']);

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


gulp.task('reload', (done) => {
  browserSync.reload();
  done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['build'], () => {
  // Serve files from the root of this project
  browserSync.init({
    port: '5656',
    server: {
      baseDir: './docs/',
    },
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch(['index.js', 'src/**/*.js'], runSequence('build', 'reload'));
  gulp.watch(['docs/index.html'], ['reload']);
});
