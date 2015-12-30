/* global __dirname */

import gulp from 'gulp';
import sass from 'gulp-sass';
import karma from 'karma';
import minifyCss from 'gulp-minify-css';
import rename from 'gulp-rename';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import path from 'path';

const paths = {
    sassSrc: ['./css/**/*.scss', './css/ionic.app.scss'],
    sassDest: './css/',
    js: ['./js/**/*.js', './test/**/*.js'],
    karmaConf: path.join(__dirname, '/karma.conf.js'),

    srcCss: './css/ionic.app.min.css',
    distDir: './www/',
    distCss: './www/css/'
};

/*
 * DEFAULTS
 */
gulp.task('default', ['sass', 'eslint']);

gulp.task('ionic-watch', () => {
    gulp.watch(paths.sassSrc, ['sass']);
});

/*
 * BUILD
 */

gulp.task('build', ['clean-dist', 'sass', 'copy-css']);

gulp.task('clean-dist', () =>
    gulp.src(paths.distDir, { read: false })
        .pipe(clean())
    );

gulp.task('copy-css', () =>
    gulp
        .src(paths.srcCss)
        .pipe(gulp.dest(paths.distCss))
    );

/*
 * SASS
 */
gulp.task('sass', () =>
    gulp.src(paths.sassSrc)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest(paths.sassDest))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(paths.sassDest))
    );

/*
 * LINT
 */
gulp.task('eslint', () =>
    gulp.src(paths.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
    );

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
