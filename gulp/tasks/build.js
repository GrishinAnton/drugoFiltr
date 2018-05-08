var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function() {
  runSequence(
  	'clean',
  	'css:copy',
  	'fonts:copy',
  	'scripts:copy',
  	'copy:feedback',
  	'copy:mail',
  	'copy:ht',
  	// 'typograf',
  	'copy:svg',
  	'tinypng'
  	 );
});