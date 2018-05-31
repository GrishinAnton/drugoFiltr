var gulp 		      = require('gulp');
var sass 		      = require('gulp-sass');
var postcss      	  = require('gulp-postcss');
var sourcemaps 		  = require('gulp-sourcemaps');
var autoprefixer 	  = require('autoprefixer')
var notify            = require("gulp-notify");
var mqpacker          = require('css-mqpacker');//структуризация медиа запросов
var cssnano           = require('cssnano');
var inlineSvg         = require('postcss-inline-svg');//https://github.com/TrySound/postcss-inline-svg
var concatCss         = require('gulp-concat-css');
var wait              = require('gulp-wait');
var rename            = require("gulp-rename")
var cfg 		      = require('../../package.json').config

var plugins = [
        autoprefixer({browsers: ['last 3 version']}),
        inlineSvg,
        mqpacker({
        sort: sortMediaQueries
        }),
        cssnano//Минификация
    ];	


gulp.task('sass', function () {
  return gulp.src(cfg.src.sass + '/**/*.sass')
    .pipe(wait(500))
    .pipe( sass().on( 'error', notify.onError(
			{
			  message: "<%= error.message %>",
			  title  : "Sass Error!"
			} ) )
		)//Код вывод ошибок для натифи
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cfg.src.css));
});

gulp.task('css:concat', function () {
  return gulp.src('app/css/libs/*.*')
    .pipe(concatCss('all.css'))
    .pipe(gulp.dest('app/css'));
});

gulp.task('css:copy', function () {
  return gulp.src('app/css/*.css')    
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('build/css'));
});
 

//функции для mqpacker
function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    A = a.replace(/\D/g, '');
    B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}
