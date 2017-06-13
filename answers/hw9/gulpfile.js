// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyHtml = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var inline = require('gulp-inline');
var gulpSequence = require('gulp-sequence');
var gulpWebpack = require('gulp-webpack');
var minifyJs = require('gulp-minify');
// 把所有在 ./assets/scss下的scss 執行編譯成 ./assets/css/*.css
gulp.task('sass', function() {
   return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./assets/css/'));
});
// 把style.css 壓縮成 style.min.css
gulp.task('minifyCss', function(){
    return gulp.src('./assets/css/style.css')
            .pipe(minifyCSS({
                keepBreaks: false
            }))
            .pipe(rename('style.min.css'))
            .pipe(gulp.dest('./assets/css'));
});
// default gulp會執行的 task sequencial執行 sass minifyCss
gulp.task('default', gulpSequence('sass','minifyCss'));

// 利用 gulp-inline 把原本 js與 css的link帶換成inline Style
gulp.task('inline-js-css', function(){
    return gulp.src('template.html')
        .pipe(inline({
             base: './',// source 所在的資料夾
        }))
        .pipe(minifyHtml({comments:false, spare:false, quotes: false}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});
// gulp-webpack 打包 
gulp.task('webpack', function(){
    return gulp.src('./assets/js/loadTwitch.js')
        .pipe(gulpWebpack(require('./gulp-webpack.config.js')))
        .pipe(gulp.dest('./assets/js/'));
});
// minify-js壓縮 js
gulp.task('minify-js', function(){
    return gulp.src('./assets/js/bundle.js')
        .pipe(minifyJs({
            ext:{
                src:'-debug.js',
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest('./assets/js/'));
});
// 依序執行 sass minifyCss inline-js-css
gulp.task('package-all', gulpSequence('sass','minifyCss','inline-js-css'));

gulp.task('package-default', gulpSequence('webpack','minify-js','sass','minifyCss','inline-js-css'));