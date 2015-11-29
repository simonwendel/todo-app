import todoListTemplate from 'templates/todo-list.html!text';

function todoList(todoRepository) {
    todos = todoRepository;

    return {
        template: todoListTemplate,
        restrict: 'E',
        scope: {},
        link: linkFn
    };
}

var todos,
    savedScope;

function linkFn(scope) {
    savedScope = scope;

    todos.subscribe(savedScope, updateList);
    savedScope.vm = {};
    updateList();
}

function updateList() {
    savedScope.vm.todos = todos.getTodo();
}

export { todoList };
