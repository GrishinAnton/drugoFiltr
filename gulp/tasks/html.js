var gulp = require('gulp');
var typograf = require('gulp-typograf');
var run = require('gulp-run');

gulp.task('typograf', function() {
    gulp.src('app/*.html')
        .pipe(typograf({
         locale: ['ru', 'en-US'],
         htmlEntity: {type: 'name'}
            // safeTags: [
            //     ['<\\?php', '\\?>']
            // ]
          }))
        .pipe(gulp.dest('build/'));
});
//Если нужно проверить на ошибки
// gulp.task('yaspeller', function (cb) {
//     return run('npm run yaspeller').exec()
// });