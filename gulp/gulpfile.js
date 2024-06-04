const {series} = require('gulp')
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// const cleanCSS = require('gulp-clean-css');
// const rename = require('gulp-rename');
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

function globalStyles() {
  return gulp
    .src('../src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(concat('style.min.css'))
    // .pipe(cleanCSS())
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('../src/styles/css'));
}



exports.default = series(globalStyles);
