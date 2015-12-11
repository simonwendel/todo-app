import gulp from 'gulp';
import sass from 'gulp-sass';
import minifyCss from 'gulp-minify-css';
import rename from 'gulp-rename';
import eslint from 'gulp-eslint';

const paths = {
    sassSrc: ['./css/**/*.scss', './css/ionic.app.scss'],
    sassDest: './css/',
    js: ['./js/**/*.js', './test/**/*.js']
};

gulp.task('default', ['sass', 'eslint']);

gulp.task('sass', done => {
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

gulp.task('eslint', done => {
    gulp.src(paths.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
})

gulp.task('watch', () => {
    gulp.watch(paths.sassSrc, ['sass']);
    gulp.watch(paths.js, ['eslint']);
});
