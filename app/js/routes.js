;(function () {
    'use strict';

    angular
        .module('todo')
        .config(setupAngularRoutes);

    /** @ngInject */
    function setupAngularRoutes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tab.todo', {
                url: '/todo',
                views: {
                    'tab-todo': {
                        templateUrl: 'templates/tab-todo.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/todo');
    }
})();
