'use strict';

var del = require('del');

module.exports = function (gulp) {
  gulp.task('clean', function () {
    return del('target/dist');
  });

  gulp.task('clean:build', function () {
    return del([
      'scripts/app.js',
      'scripts/libs.js',
      'scripts/rev-manifest.json',
      'scripts/templates.js',
      'styles/app.css',
      'styles/rev-manifest.json'
    ], {
      cwd: 'target/dist'
    });
  });
};
