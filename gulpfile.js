const gulp = require('gulp');
const webpack = require('webpack-stream');
const config = require('./webpack.config.js');

gulp.task('default', () => {
  return gulp.src('src/index.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('lib/'))
    .pipe(gulp.dest('docs/assets/js'));
});
