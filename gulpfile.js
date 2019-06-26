const gulp = require('gulp');
const concat = require('gulp-concat');
const mincss = require('gulp-clean-css');
const tinify = require('gulp-tinifier');
const minjs = require('gulp-jsmin');

gulp.task('min-css-common', async () => {
  return gulp.src('src/css/common/*.css')
    .pipe(mincss())
    .pipe(concat('common.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('min-css-entry', async () => {
  return gulp.src('src/css/entry/*.css')
    .pipe(mincss())
    .pipe(concat('entry.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('min-css-product', async () => {
  return gulp.src('src/css/product/*.css')
    .pipe(mincss())
    .pipe(concat('product.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('min-js-common', async () => {
  return gulp.src('src/js/common/*.js')
    .pipe(minjs())
    .pipe(concat('common.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('min-js-entry', async () => {
  return gulp.src('src/js/entry/*.js')
    .pipe(minjs())
    .pipe(concat('entry.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('min-js-product', async () => {
  return gulp.src('src/js/product/*.js')
    .pipe(minjs())
    .pipe(concat('product.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('copy-noncomp-imgs', async () => {
  return gulp.src('src/img/*.{ico,svg,jpeg}')
    .pipe(gulp.dest('public/img'));
});

gulp.task('comp-imgs', async () => {
  const options = {
    key: 'uZXwEu58KpazAuF2ZN752PoKc1IEJ5bT',
    verbose: true
  };

  return gulp.src('src/img/*.{png,jpg}')
    .pipe(tinify(options))
    .pipe(gulp.dest('public/img'));
});

gulp.task('watch', async () => {
  gulp.watch('src/css/common/*.css', gulp.parallel('min-css-common'));
  gulp.watch('src/css/entry/*.css', gulp.parallel('min-css-entry'));
  gulp.watch('src/css/product/*.css', gulp.parallel('min-css-product'));
  gulp.watch('src/js/common/*.js', gulp.parallel('min-js-common'));
  gulp.watch('src/js/entry/*.js', gulp.parallel('min-js-entry'));
  gulp.watch('src/js/product/*.js', gulp.parallel('min-js-product'));
  gulp.watch('src/img/*.{ico,svg,jpeg}', gulp.parallel('copy-noncomp-imgs'));
  // gulp.watch('src/img/*.{png,jpg}', gulp.parallel('comp-imgs'));
});

gulp.task(
  'default',
  gulp.parallel(
    'min-css-common',
    'min-css-entry',
    'min-css-product',
    'min-js-common',
    'min-js-entry',
    'min-js-product',
    'copy-noncomp-imgs',
    'watch'
  )
);