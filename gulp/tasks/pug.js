var pug = require('gulp-pug');
var notify = require("gulp-notify");
var gulp = require('gulp');
 
gulp.task('pug', function buildHTML() {
    return gulp.src('app/pug/*.pug')
  .pipe(pug({
  	pretty: true //Минификация
  }))
  .on('error', notify.onError(function(error){
  	return {
  		title: "Pug",
  		message: error.message
  	}
  }))
  .pipe(gulp.dest('app/'));  
});