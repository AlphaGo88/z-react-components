var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('less', function() {
    gulp.src('src/less/z.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

gulp.task('less-watch', function() {
    gulp.watch('src/less/**/*.less', ['less']);
});