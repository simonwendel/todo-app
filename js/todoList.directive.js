import todoListTemplate from 'templates/todo-list.html!text';

let todoRepo,
    savedScope;

todoListDirective.$inject = ['todoRepository'];
function todoListDirective(todoRepository) {
    todoRepo = todoRepository;

    return {
        template: todoListTemplate,
        restrict: 'E',
        scope: {},
        link: linkFn
    };
}

function linkFn(scope) {
    savedScope = scope;

    todoRepo.subscribe(savedScope, updateList);
    savedScope.vm = {};
    updateList();
}

function updateList() {
    savedScope.vm.todos = todoRepo.getTodo();
}

export { todoListDirective };
