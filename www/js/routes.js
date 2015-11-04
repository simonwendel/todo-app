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
            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-todo.html',
                        controller: 'DashCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/dash');
    }
})();
