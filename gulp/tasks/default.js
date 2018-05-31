var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function() {
   runSequence(
   	// ['ttf2woff', 'ttf2woff2'],
   	// 'scripts',
   	 'sass',
   	 'pug',
   	//  'svg',
       'js-build',
   	 // 'svg:minification',
   	//  'fonts',
   	 'css:concat',
   	 'watch',
   	 'server');
});

