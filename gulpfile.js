'use strict';

var gulp      = require('gulp'),
  merge       = require('merge-stream'),
  requireDir  = require('require-dir'),
  runSequence = require('run-sequence'),
  $           = require('gulp-load-plugins')({ DEBUG: false });

var s3 = require('gulp-s3');
var fs = require('fs');
var sftp = require('gulp-sftp');

//var gulp = require('gulp'),
//  watch = require('gulp-watch'),
//  jshint = require('gulp-jshint'),
//  stylish = require('jshint-stylish'),
//  jscs = require('gulp-jscs'),
//  webserver = require('gulp-webserver'),
//  cssmin = require('gulp-cssmin'),
//  htmlreplace = require('gulp-html-replace'),
//  rename = require('gulp-rename'),
//  concat = require('gulp-concat'),
//  sass = require('gulp-sass'),
//  uglify = require('gulp-uglify'),
//  templateCache = require('gulp-angular-templatecache'),
//  csslint = require('gulp-csslint'),
//  merge      = require('merge-stream'),
//  requireDir = require('require-dir');

// Not loaded by gulp-load-plugins, but often used
$.merge = merge;

// Load application tasks
(function () {
  var dir = requireDir('./tasks');

  Object.keys(dir).forEach(function (key) {
    dir[key] = dir[key](gulp, $);
  });
}());

gulp.task('sftp', function () {
  return gulp.src('target/dist/**/*')
    .pipe(sftp(
      JSON.parse(fs.readFileSync('sftp.json'))
    ));
});


gulp.task('s3', function () {
  var aws = JSON.parse(fs.readFileSync('./aws.json'));
//  gulp.src(['./target/dist/**'])
  gulp.src(['./app/**'])
    .pipe(s3(aws));
});



gulp.task('build', function (done) {
  runSequence('clean', ['assets', 'docs', 'scripts', 'styles'], 'html', 'clean:build', done);
});


gulp.task('serve', function (done) {
  function open() {
    // require('open')('http://localhost:9430');
    require('open')('http://local.online-inschrijven.nl:9430');
    done();
  }

  var mainTask = 'server:development';
  if ($.util.env.production) {
    mainTask = 'server:production';
  }

  runSequence('clean', mainTask, open);
});


gulp.task('lint', function () {
  $.util.noop();
  gulp.start('jshint', 'jscs');
});

gulp.task('default', function (done) {
  // Assume production when run without arguments
  $.util.env.production = true;

  // runSequence('lint', 'test', 'build', done);
  // runSequence('test', 'build', done);
  runSequence('build', done);
});


//// Compile Our Sass
//gulp.task('sass', function() {
//  return gulp.src(['scss/*.scss'])
//    .pipe(sass())
//    .pipe(gulp.dest('css'));
//});
