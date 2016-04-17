'use strict';

module.exports = function (gulp, $) {
  var target = 'target/dist/scripts';

  gulp.task('scripts:setup', function () {
    return gulp.src('components')
    $.util.noop();
    // .pipe($.symlink('app/components', { force: true, log: false }));
  });

  gulp.task('scripts:app', ['scripts:setup'], function () {
    return gulp.src('app/index.html')
      .pipe($.assets())
      .pipe($.filter([
        'forms/**/*.js',
        'account/**/*.js',
        'js/formidity.js',
        'filters.js',
        'directives.js',
        'services.js',
        '_controllers/**/*.js',
        '_modules/**/*.js',
        'components/**/*.js',
        'users/**/*.js',
        'js/vendor/redactor9.2.1/**/*.js',
        'js/vendor/moment2.8.3/**/*.js',
        'js/vendor/bowser.js',
        'js/vendor/jquery-ui-1.10.3/js/jquery-ui-1.10.3.custom.js',
        'js/vendor/faker/Faker.js',
        'js/vendor/cryptoJS/md5.js',
        'js/vendor/bootstrap/bootstrap.js',
        'js/vendor/angular-inview.js',
        'js/vendor/useragents.js',
        'js/vendor/angular.ui.sortable/sortable.js',
        'js/vendor/iframeResizer.min.js',
        'js/vendor/bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
        'js/vendor/unsavedChanges-hk.js',
        'js/vendor/lazyModel.js',
        'js/vendor/xeditable/js/xeditable.js'
      ]))
      .pipe($.size({showFiles: true}))
      .pipe($.sourcemaps.init())
      .pipe($.concat('app.js'))
      .pipe($.ngAnnotate())
      .pipe($.sourcemaps.write())
      .pipe($.size({showFiles: true}))
      .pipe(gulp.dest(target));
  });

  gulp.task('scripts:libs', function () {
    return gulp.src('app/index.html')
      .pipe($.assets())
      .pipe($.filter('bower_components/**/*.js'))
      .pipe($.sourcemaps.init())
      .pipe($.concat('libs.js'))
      .pipe($.sourcemaps.write())
      .pipe($.size({showFiles: true}))
      .pipe(gulp.dest(target));
  });

  gulp.task('scripts:templates', function () {
    return gulp.src([
        'app/**/*.tpl.html',
        'app/**/*.html',
        '!app/index.html',
      ])
//      .pipe($.size({showFiles: true}))
      .pipe($.angularTemplatecache({
        module: 'myApp'
//        standalone: true
      }))
      .pipe($.sourcemaps.init())
      .pipe($.concat('templates.js'))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(target));
  });

  gulp.task('scripts', [
    'scripts:app',
    'scripts:libs',
    'scripts:templates'
  ], function () {
    var filter = $.filter(['app.js'], {restore: true});

    return gulp.src([
        'target/dist/scripts/libs.js',
        'target/dist/scripts/app.js',
        'target/dist/scripts/templates.js'
      ])
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.concat('app.js'))
      // Turn off mangle because ui-bootstrap doe not play nice
      .pipe($.uglify(
        {
          mangle: false
        }
      ))
      .pipe($.sourcemaps.write('.'))
      .pipe(filter)
      .pipe($.rev())
      .pipe(filter.restore)
      .pipe(gulp.dest(target))
      .pipe($.rev.manifest())
      .pipe(gulp.dest(target));

  });
};
