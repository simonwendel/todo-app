import todoTemplate from 'templates/todo.html!text';

function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('todo', {
            url: '/todo',
            views: {
                todo: {
                    template: todoTemplate
                }
            }
        });

    $urlRouterProvider.otherwise('/todo');
}

export { routes };
