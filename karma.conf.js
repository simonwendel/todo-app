module.exports = function(config) {
    config.set({

        basePath: './',


        frameworks: ['jspm', 'jasmine', 'sinon'],


        files: [
            'node_modules/babel-polyfill/browser.js'
        ],


        exclude: [],


        jspm: {
            config: 'config.js',
            loadFiles: [
                'test/**/*.js'
            ],
            serveFiles: [
                'js/**/*.js',
                'templates/**/*.html'
            ]
        },


        proxies: {
            '/test/': '/base/test/',
            '/js/': '/base/js/',
            '/jspm_packages/': '/base/jspm_packages/'
        },


        preprocessors: {
            'js/**/*.js': ['babel'],
            'test/**/*.js': ['babel']
        },


        babelPreprocessor: {
            options: {
                sourceMap: 'inline'
            },
            sourceFileName: function(file) {
                return file.originalPath;
            }
        },


        reporters: ['verbose'],


        port: 9876,


        colors: true,


        logLevel: config.LOG_INFO,


        autoWatch: true,


        browsers: ['PhantomJS'],


        singleRun: true,


        concurrency: Infinity
    })
};
