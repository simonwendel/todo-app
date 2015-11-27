module.exports = function(config) {
    config.set({
        basePath: '..',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jspm', 'jasmine', 'sinon'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/babel-polyfill/browser.js'
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
            'karma-jspm'
        ],


        jspm: {
            config: "app/config.js",
            packages: "app/lib/",
            stripExtension: false,
            loadFiles: ['test/spec/app.js'],
            serveFiles: ['test/utilities/**/*.js','js/*.+(js|html|css|json)'],
            paths: {
                "github:*": "app/lib/github/*",
                "npm:*": "app/lib/npm/*"
            }
        },


        proxies: {
            '/app/': '/base/app/',
            '/test/': '/base/test/'
        },


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/js/**/*.js': ['coverage'],
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
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    })
};
