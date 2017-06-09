// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var fs = require('fs');
var replace = require('gulp-replace');
var minifyHtml = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
// 把所有在 ./assets/scss下的scss 執行編譯成 ./assets/css/*.css
gulp.task('sass', function() {
    console.log('sass');
   return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./assets/css/'));
});
// 把style.css 壓縮成 style.min.css
gulp.task('minifyCss', ['sass'], function(){
    console.log('minifyCss');
    return gulp.src('./assets/css/style.css')
            .pipe(minifyCSS({
                keepBreaks: false
            }))
            .pipe(rename('style.min.css'))
            .pipe(gulp.dest('./assets/css'));
});
// default gulp會執行的 task
gulp.task('default', ['minifyCss','sass'], function() {
    console.log('test');
    gulp.watch('./assets/scss/**/*.scss', ['sass']);
});
// 把 template.html <style></style>換成 style.min.css內容 以及把 <script></script>換成 bundle.js內容 並且 壓縮template.html成index.html
gulp.task('merge',['minifyCss'],function(){
    console.log('merge');
    return gulp.src('./assets/html/template.html')
        .pipe(replace(/<style><\/style>/g, function(s){
            let style = fs.readFileSync('./assets/css/style.min.css', 'utf8');
            return `<style>${style}</style>`;
        }))
        .pipe(replace(/<script><\/script>/g, function(s){
            let js = fs.readFileSync('./assets/js/bundle.js', 'utf8');
            return `<script>${js}</script>`;
        }))
        .pipe(minifyHtml({comments:false, spare:false, quotes: false}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

