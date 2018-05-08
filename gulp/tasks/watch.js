var gulp          = require('gulp');
var cfg 					= require('../../package.json').config

gulp.task('watch', function () {
	gulp.watch(cfg.src.sass + '/**/*.*', ['sass']);
	gulp.watch('app/css/libs/*.*', ['css:concat']);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	// gulp.watch('app/img/svg/*.svg', ['svg']);
	// gulp.watch('app/img/*.svg', ['svg:minification']);
	// gulp.watch('app/fonts/*.*', ['ttf2woff', 'ttf2woff2', 'fonts']);
	gulp.watch('app/js/libs/*.*', ['scripts']);
	gulp.watch('app/js/parts/*.*', ['js-build']);
});

