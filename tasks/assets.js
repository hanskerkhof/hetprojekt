'use strict';

module.exports = function (gulp, $) {
  function images() {
    return gulp.src([
        'app/img/**/*',
        '!app/img/{icons,icons/**}/*'
      ])
      .pipe(gulp.dest('target/dist/img'));
  }

  //function fonts() {
  //  return gulp.src('app/fonts/*.{svg,woff,eot,ttf}')
  //    .pipe(gulp.dest('target/dist/fonts'));
  //}

  function fonts() {
    return gulp.src('app/fonts/*')
      .pipe(gulp.dest('target/dist/fonts'));
  }

  function scripts() {
    return gulp.src([
        'app/js/vendor/**/*.js',
      ])
      // .pipe($.size({showFiles: true}))
      .pipe(gulp.dest('target/dist/js/vendor/'));
  }

  function sounds() {
    return gulp.src('app/sounds/*')
      .pipe(gulp.dest('target/dist/sounds'));
  }

  function videos() {
    return gulp.src('app/videos/*')
      .pipe(gulp.dest('target/dist/videos'));
  }

  gulp.task('assets', function () {
    return $.merge(images(), fonts(), sounds(), videos(), scripts());
  });
};
