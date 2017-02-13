var gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-clean-css');
    //uglify = require('gulp-uglify');

gulp.task('less', function() {
    gulp.src('src/less/zui.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

gulp.task('less-watch', function() {
    gulp.watch('src/less/**/*.less', ['less']);
});

gulp.task('css', function() {
    gulp.src('src/less/zui.less')
        .pipe(less())
        .pipe(minify())
        .pipe(gulp.dest('dist/css'));
});

// gulp.task('js', function() {
//     gulp.src('dist/js/z.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// gulp.task('default', ['css', 'js']);