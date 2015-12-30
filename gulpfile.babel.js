/* global __dirname */

import gulp from 'gulp';
import sass from 'gulp-sass';
import karma from 'karma';
import minifyCss from 'gulp-minify-css';
import htmlreplace from 'gulp-html-replace';
import htmlmin from 'gulp-htmlmin';
import rename from 'gulp-rename';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import path from 'path';
import Builder from 'systemjs-builder';

const fileNames = {
    tmpHtml: 'index.tmp.html',
    appHtml: 'index.html'
};

const paths = {
    sassSrc: ['./css/**/*.scss', './css/ionic.app.scss'],
    sassDest: './css/',
    js: ['./js/**/*.js', './test/**/*.js'],
    karmaConf: path.join(__dirname, '/karma.conf.js'),

    srcCss: './css/app.min.css',
    srcHtml: './index.html',
    srcJs: './js/app.js',

    distDir: './www/',
    distJs: './www/app.min.js'
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
    'build-systemjs-bundle',
    'replace-refs',
    'minify-html',
    'clean-tmp'
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
        .pipe(rename(fileNames.tmpHtml))
        .pipe(gulp.dest(paths.distDir))
    );

gulp.task('replace-refs', ['copy-html'], () =>
    gulp.src(paths.distDir + fileNames.tmpHtml)
        .pipe(htmlreplace({
            'css': 'app.min.css',
            'js': 'app.min.js'
        }))
        .pipe(gulp.dest(paths.distDir))
    );

gulp.task('build-systemjs-bundle', ['clean-dist'], done => {
    let builder = new Builder('./', './config.js');

    builder
        .buildStatic(paths.srcJs, paths.distJs, { minify: true, sourceMaps: false })
        .then(() => done())
        .catch(err => {
            console.log('Build error:');
            console.log(err);
        });
});

gulp.task('minify-html', ['copy-html', 'replace-refs'], () =>
    gulp.src(paths.distDir + fileNames.tmpHtml)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true }))
        .pipe(rename(fileNames.appHtml))
        .pipe(gulp.dest(paths.distDir))
    );

gulp.task('clean-tmp', ['minify-html'], () =>
    gulp.src(paths.distDir + fileNames.tmpHtml, { read: false })
        .pipe(clean())
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
