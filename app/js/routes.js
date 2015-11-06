;(function() {
    'use strict';

    angular
        .module('todo')
        .config(setupAngularRoutes);

    /** @ngInject */
    function setupAngularRoutes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('todo', {
                url: '/todo',
                views: {
                    todo: {
                        templateUrl: 'templates/todo.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/todo');
    }
})();
