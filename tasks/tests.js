'use strict';

var Server = require('karma').Server;

module.exports = function (gulp, $) {
  gulp.task('test', ['styles:test'], function (done) {
    new Server({
      configFile: __dirname + '/../karma.conf.js',
      coverageReporter: {
        type: 'text-summary'
      },
      reporters: ['dots', 'coverage'],
      singleRun: true
    }, done).start();
  });

  gulp.task('test:watch', ['styles:test'], function (done) {
    new Server({
      configFile: __dirname + '/../karma.conf.js',
      reporters: ['dots']
    }, done).start();
  });

  gulp.task('test-e2e', function () {
    gulp.src(['./test/e2e/*-spec.js'])
      .pipe($.angularProtractor({
        configFile: 'protractor.conf.js',
        autoStartStopServer: true,
        debug: true
      }))
      .on('error', function (e) {
        throw e;
      });
  });
};
