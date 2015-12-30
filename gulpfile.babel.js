/* global __dirname */

import gulp from 'gulp';
import sass from 'gulp-sass';
import karma from 'karma';
import minifyCss from 'gulp-minify-css';
import htmlreplace from 'gulp-html-replace';
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
    srcHtml: './index.html',

    distDir: './www/',
    distHtml: './www/index.html'
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

gulp.task('build', [
    'clean-dist',
    'sass',
    'copy-css',
    'copy-html',
    'replace-refs'
]);

gulp.task('clean-dist', () =>
    gulp.src(paths.distDir, { read: false })
        .pipe(clean())
    );

gulp.task('copy-css', ['clean-dist', 'sass'], () =>
    gulp
        .src(paths.srcCss)
        .pipe(gulp.dest(paths.distDir))
    );

gulp.task('copy-html', ['clean-dist'], () =>
    gulp
        .src(paths.srcHtml)
        .pipe(gulp.dest(paths.distDir))
    );

gulp.task('replace-refs', ['copy-html'], () =>
    gulp.src(paths.distHtml)
        .pipe(htmlreplace({
            'css': 'ionic.app.min.css'
        }))
        .pipe(gulp.dest(paths.distDir))
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

gulp.task('test', done => {
    new Server({
        configFile: paths.karmaConf,
        singleRun: true
    }, () => done()).start();
});

gulp.task('tdd', done => {
    new Server({
        configFile: paths.karmaConf,
        singleRun: false
    }, () => done()).start();
});
