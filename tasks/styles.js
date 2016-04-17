'use strict';

module.exports = function (gulp, $) {
  var target = 'target/dist/styles',
    processors, sassOptions;

  var es = require('event-stream');

  processors = [
    require('autoprefixer')({browsers: ['last 2 versions', 'IE >= 9']}),
    require('css-mqpacker'),
    require('csswring')
  ];

  sassOptions = {
    includePaths: [
      'components',
      'app/bower_components'
    ]
  };

  gulp.task('styles', function () {
//    var filter = $.filter(['*.css'], { restore: true });
    var production = $.util.env.production;

    var vendorFiles = gulp.src([
        'app/css/**/*.css',
        'app/bower_components/angular-loading-bar/build/loading-bar.css',
        'app/bower_components/angular-busy/angular-busy.css',
        'app/js/vendor/bootstrap-colorpicker/css/colorpicker.css',
        'app/js/vendor/redactor9.2.1/redactor.css',
        'app/js/vendor/redactor9.2.1/clips.css',
        'app/js/vendor/xeditable/css/xeditable.css',
        'app/js/vendor/toastr/toastr.css',
        'app/bower_components/ui-select/dist/select.css'
      ])
      .pipe($.size({showFiles: true}));

    var appFiles = gulp.src('app/scss/app.scss')
      .pipe($.size({showFiles: true}))
      .pipe($.sass(sassOptions).on('error', $.sass.logError));
//      .pipe($.autoprefix('last 3 version'));

    return es.concat(vendorFiles, appFiles)
      .pipe($.concat('app.css'))
      .pipe(production ? $.rev() : $.util.noop())
      .pipe($.postcss(processors))
      .pipe(gulp.dest(target))
      .pipe($.size({showFiles: true}))
      .pipe(production ? $.rev.manifest() : $.util.noop())
      .pipe(production ? gulp.dest(target) : $.util.noop());

    //return gulp.src('app/scss/app.scss')
    //  .pipe($.size({showFiles: true}))
    //  .pipe($.sourcemaps.init())
    //  .pipe($.sass(sassOptions).on('error', $.sass.logError))
    //  .pipe($.postcss(processors))
    //  .pipe($.sourcemaps.write('.'))
    //  .pipe(filter)
    //  .pipe(production ? $.rev() : $.util.noop())
    //  .pipe(filter.restore)
    //  .pipe(gulp.dest(target))
    //  .pipe(production ? $.rev.manifest() : $.util.noop())
    //  .pipe(production ? gulp.dest(target) : $.util.noop());
  });

  gulp.task('styles:test', function () {
    return gulp.src('test/test.scss')
      .pipe($.sass(sassOptions).on('error', $.sass.logError))
      .pipe(gulp.dest(target));
  });
};
