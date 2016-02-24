var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');

/*browserify的配置文件*/
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

/*postcss的配置文件*/
var cssnext = require('cssnext');
var lost = require('lost');
var rucksack = require('rucksack-css');

var customOpts = {
    entries: ['js/src/app.js'],
    debug: true
};
var opts = Object.assign({}, watchify.args, customOpts);

//styles配置
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

//browserify配置
gulp.task('watchify', function(){
    var bundler = watchify(browserify(opts));

    function rebundle() {
        return bundler.bundle()
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('js/dist'));
    }

    bundler.transform(babelify)
        .on('update', rebundle);
    return rebundle();
});


gulp.task('watch:styles',function(){
    gulp.watch('styles/*.scss',['styles']);
});
