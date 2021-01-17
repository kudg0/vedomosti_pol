var gulp = require('gulp');

var batch = require('gulp-batch');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var clearFix = require('postcss-clearfix');
var colorShort = require('postcss-color-short');
var cssMqpacker = require('css-mqpacker');
var cssNano = require('cssnano');
var cssNext = require('postcss-cssnext');
var discardComments = require('postcss-discard-comments');
var focus = require('postcss-focus');
var fileinclude = require('gulp-file-include');
var filejsInclude = require('gulp-include');

var htmlHint = require('gulp-htmlhint');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var imageOp = require('gulp-imageoptim');
var postcss = require('gulp-postcss');
var precss = require('precss');
var px2Rem = require('postcss-pxtorem');
var responsiveImages = require('postcss-responsive-images');
var short = require ('postcss-short');
var size = require('postcss-size');
var typograf = require('gulp-typograf');
var uglify = require('gulp-uglify-es').default;
var watch = require('gulp-watch');

var inlinesource = require('gulp-inline-source');

const imagemin = require("gulp-imagemin");
const webp = require("imagemin-webp");
const extReplace = require("gulp-ext-replace");



gulp.task('default', ['server'], function() {
  gulp.watch('src/html/**', function(event) {
    gulp.run('html');
  });
  gulp.watch('src/css/**', function(event) {
    gulp.run('postcss');
  });
  gulp.watch('src/js/**', function(event) {
    gulp.run('js');
  });
  gulp.watch('src/img/**', function(event) {
    gulp.run('imgCopy');
  });
  gulp.watch('src/fonts/**', function(event) {
    gulp.run('fontsCopy');
  });

  gulp.watch('dist/index.html', function(events) {
    gulp.run('inlineSource');
  });
});

// HTML
gulp.task('html', function() {
  gulp.src('src/html/index.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    // .pipe(
    //   htmlmin({
    //     collapseWhitespace: true,
    //     removeComments: true
    //   })
    // )
    // .pipe(
    //   typograf({
    //     locale: ['ru', 'en-US'],
    //     htmlEntity: { type: 'name' },
    //     enableRule: ['ru/money/ruble']
    //   })
    // )
    // .pipe(htmlHint())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});



// PostCSS
gulp.task('postcss', function () {
  var processors = [
    colorShort,
    focus,
    precss,
    short,
    size,
    responsiveImages,
    clearFix,
    px2Rem,
    cssNext,
    cssMqpacker,
    discardComments,
    cssNano
  ];
  return gulp.src('src/css/index.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});


//IMG COPY
gulp.task('imgCopy', function() {
  gulp.src('src/img/**')
    .pipe(gulp.dest('dist/img/'))
    .pipe(browserSync.stream());
});

//FONTS COPY
gulp.task('fontsCopy', function() {
  gulp.src('src/fonts/**')
    .pipe(gulp.dest('dist/fonts/'))
    .pipe(browserSync.stream());
});


// JavaScript
gulp.task('js', function () {
  return gulp.src('src/js/index.js')
    .pipe(filejsInclude({
      extensions: 'js',
      hardFail: true,
      separateInputs: true,
      includePaths: [
        __dirname + '/bower_components',
        __dirname + '/src/js'
      ]
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});


// HTML DIST
gulp.task('inlineSource', function () {
  gulp.src('dist/index.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});


// Server
gulp.task('server', function() {
  browserSync.init({
    port: 8000,
    server: {
      baseDir: "dist"
    },
    open: false
  });
});
