module.exports = function(config) {
    config.set({
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jspm', 'jasmine', 'sinon'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/babel-polyfill/browser.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'lib/system.js'
        ],


        // list of files to exclude
        exclude: [],


        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-ng-html2js-preprocessor',
            'karma-sinon',
            'karma-jspm',
            'karma-babel-preprocessor'
        ],


        jspm: {
            config: "js/config.js",
            loadFiles: ['js/**/*.spec.js'],
            serveFiles: ['js/*.js']
        },


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'js/**/*.js': ['babel', 'coverage'],
            'app/templates/**/*.html': ['ng-html2js']
        },


        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            moduleName: 'todo.test.templates'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    })
};
