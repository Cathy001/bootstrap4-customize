var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');

var cssnext = require('cssnext');
var lost = require('lost');
var rucksack = require('rucksack-css');

gulp.task('styles',function(){
    var processors = [
        lost,
        rucksack,
        cssnext({})
    ];

    return gulp.src('styles/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error',sass.logError))
        .pipe(postcss(processors))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('styles/dest'))
});

gulp.task('watch:styles',function(){
    gulp.watch('styles/*.scss',['styles']);
});

