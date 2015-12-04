import todoListTemplate from 'templates/todo-list.html!text';

let todoRepository,
    savedScope;

todoListDirective.$inject = ['todoRepository'];
function todoListDirective(todoRepositoryFactory) {
    todoRepository = todoRepositoryFactory;

    return {
        template: todoListTemplate,
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

export { todoListDirective };
