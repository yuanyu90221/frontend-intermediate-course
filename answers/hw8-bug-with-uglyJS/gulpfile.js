// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('./assets/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./assets/css/'))
});

gulp.task('default', ['sass'], function() {
    gulp.watch('./assets/scss/**/*.scss', ['sass']);
});