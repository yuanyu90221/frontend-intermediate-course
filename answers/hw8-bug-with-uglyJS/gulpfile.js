// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
// var webpack = require('webpack');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');
var fs = require('fs');
var replace = require('gulp-replace');
gulp.task('sass', function() {
    console.log('sass');
   return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('default', ['sass'], function() {
    console.log('test');
    gulp.watch('./assets/scss/**/*.scss', ['sass']);
});
gulp.task('webpack', function(){
    // return webpack(webpackConfig, function(err, status){
    //     if(err){
    //         console.log('webpack err');
    //     }
    //     console.log(status);
    // });
    return gulp.src('./assets/js/loadTwitch.js')
           .pipe(webpack(webpackConfig))
           .pipe(gulp.dest('./assets/js/'));
});
gulp.task('merge',['sass'],function(){
    console.log('merge');
    return gulp.src('index.html')
        .pipe(replace(/<style><\/style>/g, function(s){
            let style = fs.readFileSync('./assets/css/style.css', 'utf8');
            return `<style>${style}</style>`;
        }))
        .pipe(replace(/<script><\/script>/g, function(s){
            let js = fs.readFileSync('./assets/js/bundle.js', 'utf8');
            return `<script>${js}</script>`;
        }))
        .pipe(rename('index-mg.html'))
        .pipe(gulp.dest('./'));
});

