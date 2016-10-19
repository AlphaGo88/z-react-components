var gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-clean-css'),
    uglify = require('gulp-uglify');

gulp.task('less', function() {
    gulp.src('src/less/z.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

gulp.task('less-watch', function() {
    gulp.watch('src/less/**/*.less', ['less']);
});

gulp.task('css', function() {
    gulp.src('src/css/z.css')
        .pipe(minify())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function() {
    gulp.src('examples/z.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});