var gulp 					= require('gulp');
var browserSync 	= require('browser-sync').create();

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        },
        notify: false, // Отключаем уведомления
        files: ['app/*.html', 'app/css/*', 'app/js/*', 'app/img/*' ]
    });
});