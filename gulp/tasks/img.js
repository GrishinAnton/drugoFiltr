var gulp = require('gulp');
var tinypng = require('gulp-tinypng-compress');
 
gulp.task('tinypng', function () {
    gulp.src('app/img/**/*.{png,jpg,jpeg}')
        .pipe(tinypng('UcE5ePeSswSWEouT520TJ3fv5x3nr5EE'))
        .pipe(gulp.dest('build/img'));
});