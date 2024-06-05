const { series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');

function globalStyles() {
  return gulp
    .src('../src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss({ "uglyComments": true }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('../src/styles/css'));
}

function pagesStyles() {
  return gulp
    .src('../src/pages/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss({ "uglyComments": true }))
    .pipe(concat('pagesStyles.min.css'))
    .pipe(gulp.dest('../src/styles/css'));
}

exports.default = series(globalStyles, pagesStyles);
