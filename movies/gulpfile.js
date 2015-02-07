var gulp = require('gulp');
var csso = require('gulp-csso');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var less = require('gulp-less');
var util = require('gulp-util');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');

var paths = {
	js: ['client/app/app.module.js', 'client/app/**/*.js'],
	styles: ['client/less/custom-variables.less',
           'client/less/custom-bootstrap.less', 
           'client/less/**/*.less']
}

gulp.task('js', function() {
  gulp.src(paths.js)
      .pipe(wrap('(function(){\n"use strict;"\n<%= contents %>\n})();')) 
      .pipe(concat('app.js'))
      .pipe(gulp.dest('client/dist'))
      .pipe(plumber())
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('client/dist'))
      .on('error', util.log)
});

gulp.task('less', function() {
	gulp.src(paths.styles)
    .pipe(concat('style.css'))
    .pipe(plumber())
		.pipe(less())
    .pipe(csso())
    .pipe(rename('style.min.css'))
		.pipe(gulp.dest('client/dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.styles, ['less']);
});

gulp.task('default', ['js', 'less', 'watch']);