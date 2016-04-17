'use strict';

var extend = require('extend');

module.exports = function (gulp, $) {
  var jshintOptions = {
    base: {
      lookup: false,
      // Enforcing
      camelcase: true,
      curly: true,
      eqeqeq: true,
      freeze: true,
      immed: true,
      newcap: true,
      noarg: true,
      nonbsp: true,
      nonew: true,
      quotmark: 'single',
      undef: true,
      unused: true,
      // Relaxing
      boss: true,
      eqnull: true,
      globalstrict: true
    }
  };

  jshintOptions.app = extend({
    browser: true,
    jquery: true,
    predef: ['_', 'angular'],
    globals: {
      $: true
    }
  }, jshintOptions.base);
  jshintOptions.build = extend({
    node: true
  }, jshintOptions.base);
  jshintOptions.test = extend(jshintOptions.app, {
    predef: [
      '_',
      'afterEach',
      'angular',
      'beforeEach',
      'describe',
      'expect',
      'inject',
      'it',
      'jasmine',
      'module',
      'runs',
      'spyOn',
      'waits',
      'xit'
    ]
  });

  gulp.task('jscs', function () {
    return $.merge(
      gulp.src([
          'Gruntfile.js',
          'gulpfile.js',
          'karma.conf.js',
          'components/**/*.js',
          'app/scripts/**/*.js',
          'tasks/*.js'
        ]).pipe($.jscs()),
      gulp.src([
          'test/test.js',
          'test/spec/**/*.js'
        ]).pipe($.jscs({ configPath: 'test/.jscsrc' }))
      .pipe($.jscsStylish()));
  });

  gulp.task('jshint', function () {
    return $.merge(
      gulp.src([
          'Gruntfile',
          'gulpfile.js',
          'karma.conf.js',
          'tasks/*.js'
        ]).pipe($.jshint(jshintOptions.build)),
      gulp.src([
          'app/forms/**/*.js',
          'app/scripts/**/*.js'
        ]).pipe($.jshint(jshintOptions.app)),
      gulp.src([
          'test/test.js',
          'test/spec/**/*.js'
          ]).pipe($.jshint(jshintOptions.test)))
      .on('error', function () {})
      .pipe($.jshint.reporter('jshint-stylish'));
  });
};
