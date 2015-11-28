const routes = ($stateProvider, $urlRouterProvider) => {
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
};

export { routes };
