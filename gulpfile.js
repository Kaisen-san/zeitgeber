const gulp = require('gulp');
const concat = require('gulp-concat');
const mincss = require('gulp-clean-css');
const tinify = require('gulp-tinifier');
const minjs = require('gulp-jsmin');

gulp.task('min-css', async () => {
  return gulp.src('src/css/*.css')
    .pipe(mincss())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('min-js', async () => {
  return gulp.src('src/js/*.js')
    .pipe(minjs())
    .pipe(concat('index.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('cpy-noncomp-imgs', async () => {
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
  gulp.watch('src/css/*.css', gulp.parallel('min-css'));
  gulp.watch('src/js/*.js', gulp.parallel('min-js'));
  gulp.watch('src/img/*.{ico,svg,jpeg}', gulp.parallel('cpy-noncomp-imgs'));
  // gulp.watch('src/img/*.{png,jpg}', gulp.parallel('comp-imgs'));
});

gulp.task('default', gulp.parallel('min-css', 'min-js', 'cpy-noncomp-imgs', 'comp-imgs', 'watch'));