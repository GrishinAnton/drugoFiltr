var gulp = require('gulp');


gulp.task('copy:feedback', function() {
  return gulp.src('app/feedback/**/*')
  .pipe(gulp.dest('build/feedback'))
});

gulp.task('copy:mail', function() {
  return gulp.src('app/mail.php')
  .pipe(gulp.dest('build/'))
});

gulp.task('copy:ht', function() {
  return gulp.src('app/.htaccess')
  .pipe(gulp.dest('build/'))
});

gulp.task('copy:svg', function() {
  return gulp.src('app/img/**/*.svg')
  .pipe(gulp.dest('build/img/'))
});