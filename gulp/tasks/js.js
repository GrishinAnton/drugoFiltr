var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename")

gulp.task('js-build', function () {
	gulp.src('app/js/common.js')
		.pipe(gulp.dest('app/js/'));
});

 
// gulp.task('scripts', function() {
//   return gulp.src('app/js/libs/*.js')
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('app/js/'));
// });

gulp.task('scripts:copy', function() {
  return gulp.src('app/js/*.js')
  	.pipe(uglify())
  	.pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('build/js'));
});