/* global __dirname */

import gulp from 'gulp';
import sass from 'gulp-sass';
import karma from 'karma';
import minifyCss from 'gulp-minify-css';
import rename from 'gulp-rename';
import eslint from 'gulp-eslint';
import path from 'path';

const paths = {
    sassSrc: ['./css/**/*.scss', './css/ionic.app.scss'],
    sassDest: './css/',
    js: ['./js/**/*.js', './test/**/*.js'],
    karmaConf: path.join(__dirname, '/karma.conf.js')
};

/*
 * DEFAULTS
 */
gulp.task('default', ['sass', 'eslint']);

gulp.task('ionic-watch', () => {
    gulp.watch(paths.sassSrc, ['sass']);
});

/*
 * SASS
 */
gulp.task('sass', done => {
    gulp.src(paths.sassSrc)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest(paths.sassDest))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(paths.sassDest))
        .on('end', done);
});

/*
 * LINT
 */
gulp.task('eslint', () => {
    gulp.src(paths.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


/*
 * KARMA
 */
let Server = karma.Server;

gulp.task('test', (done) => {
    new Server({
        configFile: paths.karmaConf,
        singleRun: true
    }, () => done()).start();
});

gulp.task('tdd', (done) => {
    new Server({
        configFile: paths.karmaConf,
        singleRun: false
    }, () => done()).start();
});
