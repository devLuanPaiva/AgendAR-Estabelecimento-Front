const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

function globalStyles() {
  return gulp
    .src('../src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('../src/styles/css'));
}

function pageStyles() {
  return gulp
    .src('../src/pages/**/*.scss') 
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('../src/pages/css'));
}

function watchFiles() {
  gulp.watch('../src/styles/**/*.scss', globalStyles);
  gulp.watch('../src/pages/**/*.scss', pageStyles);
}

exports.globalStyles = globalStyles;
exports.pageStyles = pageStyles;
exports.watch = watchFiles;

exports.default = gulp.series(globalStyles, pageStyles, watchFiles);
