import listTemplate from 'templates/list.html!text';

let todoRepository,
    savedScope;

listDirective.$inject = ['todoRepository'];
function listDirective(todoRepositoryFactory) {
    todoRepository = todoRepositoryFactory;

    return {
        template: listTemplate,
        restrict: 'E',
        scope: {},
        link: linkFn
    };
}

function linkFn(scope) {
    savedScope = scope;

    todoRepository.subscribe(savedScope, updateList);
    savedScope.vm = {};
    updateList();
}

function updateList() {
    savedScope.vm.todos = todoRepository.getTodo();
}

export { listDirective };
