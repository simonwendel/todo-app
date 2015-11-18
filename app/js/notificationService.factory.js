;(function() {
    'use strict';

    angular
        .module('todo')
        .factory('notificationService', notificationService);

    /** @ngInject */
    function notificationService($rootScope) {
        rootScope = $rootScope;

        return {
            build: build
        };
    }

    var rootScope;

    function build(eventName) {
        return {
            subscribe: function(scope, callback) {
                var handler = rootScope.$on(eventName, callback);
                scope.$on('$destroy', handler);
            },
            notify: function() {
                rootScope.$emit(eventName);
            }
        };
    }
})();
