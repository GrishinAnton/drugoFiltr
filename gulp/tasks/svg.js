var gulp = require('gulp')
var svgmin = require('gulp-svgmin')
var svgSprite = require('gulp-svg-sprite')
var cheerio = require('gulp-cheerio')
var replace = require('gulp-replace');


gulp.task('svg', function() {
    return gulp.src('app/img/svg/*.svg')
        .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    .pipe(cheerio({
        parserOptions: { xmlMode: true }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "sprite.svg"
            }
        }
    }))
    .pipe(gulp.dest('app/img/svg/'));
});

// gulp.task('svg:minification', function() {
//     return gulp.src('app/img/*.svg')
//         .pipe(svgmin({
//         js2svg: {
//             pretty: true
//         }
//     }))
//     .pipe(cheerio({
//         run: function($) {
//             $('[fill]').removeAttr('fill');
//             $('[stroke]').removeAttr('stroke');
//             $('[style]').removeAttr('style');
//         },
//         parserOptions: { xmlMode: true }
//     }))
//     .pipe(replace('&gt;', '>'))
//     .pipe(gulp.dest('app/img/'));
// });

