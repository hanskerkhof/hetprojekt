'use strict';

module.exports = function (gulp, $) {
  gulp.task('docs', function () {
    return gulp.src('docs/**/*.md')
      .pipe($.markdown({
        gfm: true
      }))
      .pipe($.wrap({
        src: 'docs/template.jst'
      }))
      .pipe(gulp.dest('target/dist/docs'));
  });
};
