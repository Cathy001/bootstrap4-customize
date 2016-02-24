var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');

/*压缩和合并js和css的插件*/
var gulpif = require('gulp-if');
var eslint = require('gulp-eslint');
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var useref = require('gulp-useref');

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

gulp.task('es6', function(){
    return gulp.src('public/js/es6/*.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('public/js'));
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


//代码的压缩和合并
function lint(files,options){
    return function(){
        return gulp.src(files)
            .pipe(eslint(options))
            .pipe(eslint.format())
    };
};
gulp.task('lint', lint('public/js/*.js'));

gulp.task('html', ['styles'], function(){
    var assets = useref.assets({searchPath: ['public']});

    return gulp.src('public/appindex.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({compatibility: '*'})))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulpif('public/appindex.html', minifyHtml({conditionals: true, loose: true})))
        .pipe(gulp.dest('public/dist'));
});

//单个js和css文件的压缩
/*gulp.task('componentjsmin',function(){
    return gulp.src('public/component/!**!/!*.js')
        .pipe(uglify())
        .pipe(gulp.dest('newpublic/component'));
});
gulp.task('jsmin',function(){
    return gulp.src(['public/js/!**!/!*.js','!public/js/browserify/!**!/!*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('newpublic/js'));
});
gulp.task('cssmin',function(){
    return gulp.src('public/!**!/!*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('newpublic'));
});
gulp.task('filemin',['cssmin','jsmin','componentjsmin']);*/
