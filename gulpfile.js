const gulp = require('gulp');
const concat = require('gulp-concat');
const mincss = require('gulp-clean-css');
const tinify = require('gulp-tinifier');
const minjs = require('gulp-jsmin');

gulp.task('min-css-common', async () => {
  return gulp.src(['src/styles/*.css', 'src/components/*.css'])
    .pipe(mincss())
    .pipe(concat('common.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('min-css-main', async () => {
  return gulp.src('src/styles/main/*.css')
    .pipe(mincss())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('min-css-product', async () => {
  return gulp.src('src/styles/product/*.css')
    .pipe(mincss())
    .pipe(concat('product.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('min-js-common', async () => {
  return gulp.src(['src/scripts/index.js', 'src/scripts/utils/*.js', 'src/components/*.js'])
    .pipe(minjs())
    .pipe(concat('common.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('min-js-main', async () => {
  return gulp.src('src/scripts/main.js')
    .pipe(minjs())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('min-js-product', async () => {
  return gulp.src('src/scripts/product.js')
    .pipe(minjs())
    .pipe(concat('product.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('copy-noncomp-imgs', async () => {
  return gulp.src('src/images/*.{ico,svg,jpeg}')
    .pipe(gulp.dest('public/img'));
});

gulp.task('comp-imgs', async () => {
  const options = {
    key: 'uZXwEu58KpazAuF2ZN752PoKc1IEJ5bT',
    verbose: true
  };

  return gulp.src('src/images/*.{png,jpg}')
    .pipe(tinify(options))
    .pipe(gulp.dest('public/img'));
});

gulp.task('watch', async () => {
  gulp.watch(['src/styles/*.css', 'src/components/*.css'], gulp.parallel('min-css-common'));
  gulp.watch('src/styles/main/*.css', gulp.parallel('min-css-main'));
  gulp.watch('src/styles/product/*.css', gulp.parallel('min-css-product'));
  gulp.watch(['src/scripts/utils/*.js', 'src/components/*.js'], gulp.parallel('min-js-common'));
  gulp.watch('src/scripts/main.js', gulp.parallel('min-js-main'));
  gulp.watch('src/scripts/product.js', gulp.parallel('min-js-product'));
  gulp.watch('src/images/*.{ico,svg,jpeg}', gulp.parallel('copy-noncomp-imgs'));
  // gulp.watch('src/images/*.{png,jpg}', gulp.parallel('comp-imgs'));
});

gulp.task(
  'default',
  gulp.parallel(
    'min-css-common',
    'min-css-main',
    'min-css-product',
    'min-js-common',
    'min-js-main',
    'min-js-product',
    'copy-noncomp-imgs',
    'watch'
  )
);
