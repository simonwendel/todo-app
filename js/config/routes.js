import todoTemplate from 'templates/todo.html!text';

routeSetup.$inject = ['$stateProvider', '$urlRouterProvider'];
function routeSetup($stateProvider, $urlRouterProvider) {
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

export { routeSetup };
