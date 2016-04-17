'use strict';

module.exports = function (gulp, $) {
  gulp.task('html', function () {
    var production = $.util.env.production,
        options;

    if (production) {
      var manifests = {
        scripts: require('../target/dist/scripts/rev-manifest.json'),
        styles:  require('../target/dist/styles/rev-manifest.json')
      };

      options = {
        js: {
          src: 'scripts/' + manifests.scripts['app.js']
        },
        css: {
          src: 'styles/' + manifests.styles['app.css']
        }
      };
    }

    var icons = gulp.src('app/img/icons/*.svg')
      .pipe($.size({showFiles: true}))
      .pipe($.svgmin())
      .pipe($.svgstore({ inlineSvg: true }))
      .pipe($.cheerio(function ($) {
        $('svg').attr('style', 'display:none');
      }));

    function fileContents(filePath, file) {
      return file.contents.toString('utf8');
    }

    return gulp.src('app/index.html')
      .pipe($.inject(icons, {
        quiet: true,
        transform: fileContents
      }))
      .pipe(production ? $.htmlReplace(options) : $.util.noop())
      .pipe(gulp.dest('target/dist'));
  });
};
