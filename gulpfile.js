var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');

var paths = {
    sassSrc: ['./css/**/*.scss', './css/ionic.app.scss'],
    sassDest: './css/',
    js: ['./js/**/*.js', './test/**/*.js']
};

gulp.task('default', ['sass', 'eslint']);

gulp.task('sass', function (done) {
    gulp.src(paths.sassSrc)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest(paths.sassDest))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(paths.sassDest))
        .on('end', done);
});

gulp.task('eslint', function (done) {
    gulp.src(paths.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
})

gulp.task('watch', function () {
    gulp.watch(paths.sassSrc, ['sass']);
    gulp.watch(paths.js, ['eslint']);
});
