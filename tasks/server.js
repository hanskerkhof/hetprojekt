'use strict';

var path = require('path');

module.exports = function (gulp, $) {
  var lr;

  gulp.task('connect', function (done) {
    var connect = require('connect'),
        http = require('http'),
        livereload = require('connect-livereload'),
        livereloadPort = 39730,
        modrewrite = require('connect-modrewrite'),
        serveStatic = require('serve-static'),
        tinyLr = require('tiny-lr');

    var app = connect()
      /* Rewrite URLs */
      .use(modrewrite(['!(\\.\\w+($|\\?)|\/docs) /index.html']))
      /* Livereload */
      .use(livereload({port: livereloadPort}))
      /* Mount dist */
      .use(serveStatic('target/dist/'))
      /* Mount app */
//      .use(serveStatic('demo-app/app'));
      .use(serveStatic('app'));

    var server = http.createServer(app);

    server.listen(9430, '0.0.0.0', function (err) {
      if (err) {
        $.util.log('Error on starting server:', $.util.colors.red(err));
      } else {
        $.util.log('Server started at', $.util.colors.green('http://0.0.0.0:9430'));

        lr = tinyLr();
        lr.listen(livereloadPort, function () {
          $.util.log('LiveReload started on port', $.util.colors.green(livereloadPort));

          done();
        });
      }
    });
  });

  gulp.task('server:development', [
    'connect',
    'html',
    'scripts:templates',
    'styles'
  ], function () {
    gulp.start('watch');
  });

  gulp.task('server:production', ['build', 'connect']);

  gulp.task('watch', function () {
    gulp.watch([
      'app/**/*.tpl.html',
      //'demo-app/app/images/**/*',
      'app/**/*.js',
      //'components/**/*.js',
      //'target/dist/index.html',
      //'target/dist/scripts/templates.js',
      'target/dist/styles/app.css'
    ], function (event) {
      $.util.log('Reloading', $.util.colors.blue(path.relative('.', event.path)));
      lr.changed({
        body: {
          files: event.path
        }
      });
    });

    gulp.watch([
      'app/images/icons/*.svg'
    ], ['html']);

    gulp.watch([
      'gulpfile.js',
      'Gruntfile.js',
      'karma.conf.js',
      'components/**/*.js',
      'app/**/*.js',
      'app/js/**/*.js',
      'tasks/*.js',
      'test/test.js',
      'test/spec/**/*.js'
    ], ['lint']);

    gulp.watch([
      'components/**/*.scss',
      'app/scss/**/*.scss'
    ], ['styles']);

    gulp.watch([
      'components/**/*.html',
      'app/**/*.tpl.html'
    ], ['scripts:templates']);
  });
};
