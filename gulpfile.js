const gulp = require('gulp');
const concat = require('gulp-concat');
const mincss = require('gulp-clean-css');
const tinify = require('gulp-tinifier');
const minjs = require('gulp-jsmin');

const task = (srcPaths, runner, outputName, dropFolder) => {
  return gulp.src(srcPaths)
    .pipe(runner())
    .pipe(concat(outputName))
    .pipe(gulp.dest(dropFolder));
}

gulp.task('min-css-common', async () => task('src/frontend/styles/*.css', mincss, 'common.min.css', 'public/css'));

gulp.task('min-css-components', async () => task('src/frontend/components/*.css', mincss, 'components.min.css', 'public/css'));

gulp.task('min-css-main', async () => task('src/frontend/styles/main/*.css', mincss, 'main.min.css', 'public/css'));

gulp.task('min-css-product', async () => task('src/frontend/styles/product/*.css', mincss, 'product.min.css', 'public/css'));

gulp.task('min-css-login', async () => task('src/frontend/styles/login/*.css', mincss, 'login.min.css', 'public/css'));

gulp.task('min-css-admin', async () => task('src/frontend/styles/admin/*.css', mincss, 'admin.min.css', 'public/css'));

gulp.task('min-js-common', async () => task(['src/frontend/scripts/index.js', 'src/frontend/utils/*.js'], minjs, 'common.min.js', 'public/js'));

gulp.task('min-js-components', async () => task('src/frontend/components/*.js', minjs, 'components.min.js', 'public/js'));

gulp.task('min-js-main', async () => task('src/frontend/scripts/main.js', minjs, 'main.min.js', 'public/js'));

gulp.task('min-js-product', async () => task('src/frontend/scripts/product.js', minjs, 'product.min.js', 'public/js'));

gulp.task('min-js-login', async () => task('src/frontend/scripts/login.js', minjs, 'login.min.js', 'public/js'));

gulp.task('min-js-admin', async () => task('src/frontend/scripts/admin.js', minjs, 'admin.min.js', 'public/js'));

gulp.task('min-js-admin-product', async () => task('src/frontend/scripts/admin-product.js', minjs, 'admin-product.min.js', 'public/js'));

gulp.task('copy-noncompress-imgs', async () => gulp.src('src/frontend/images/*.{ico,svg,jpeg}').pipe(gulp.dest('public/img')));

gulp.task('compress-imgs', async () => {
  const options = {
    key: 'uZXwEu58KpazAuF2ZN752PoKc1IEJ5bT',
    verbose: true
  };

  return gulp.src('src/frontend/images/*.{png,jpg}')
    .pipe(tinify(options))
    .pipe(gulp.dest('public/img'));
});

gulp.task('watch', async () => {
  gulp.watch('src/frontend/styles/*.css', gulp.parallel('min-css-common'));
  gulp.watch('src/frontend/components/*.css', gulp.parallel('min-css-components'));
  gulp.watch('src/frontend/styles/main/*.css', gulp.parallel('min-css-main'));
  gulp.watch('src/frontend/styles/product/*.css', gulp.parallel('min-css-product'));
  gulp.watch('src/frontend/styles/login/*.css', gulp.parallel('min-css-login'));
  gulp.watch('src/frontend/styles/admin/*.css', gulp.parallel('min-css-admin'));
  gulp.watch(['src/frontend/scripts/index.js', 'src/frontend/utils/*.js'], gulp.parallel('min-js-common'));
  gulp.watch('src/frontend/components/*.js', gulp.parallel('min-js-components'));
  gulp.watch('src/frontend/scripts/main.js', gulp.parallel('min-js-main'));
  gulp.watch('src/frontend/scripts/product.js', gulp.parallel('min-js-product'));
  gulp.watch('src/frontend/scripts/login.js', gulp.parallel('min-js-login'));
  gulp.watch('src/frontend/scripts/admin.js', gulp.parallel('min-js-admin'));
  gulp.watch('src/frontend/scripts/admin-product.js', gulp.parallel('min-js-admin-product'));
  gulp.watch('src/frontend/images/*.{ico,svg,jpeg}', gulp.parallel('copy-noncompress-imgs'));
  // gulp.watch('src/frontend/images/*.{png,jpg}', gulp.parallel('compress-imgs'));
});

gulp.task('default', gulp.parallel(
  'min-css-common',
  'min-css-components',
  'min-css-main',
  'min-css-product',
  'min-css-login',
  'min-css-admin',
  'min-js-common',
  'min-js-components',
  'min-js-main',
  'min-js-product',
  'min-js-login',
  'min-js-admin',
  'min-js-admin-product',
  'copy-noncompress-imgs',
  // 'compress-imgs',
  'watch'
));
