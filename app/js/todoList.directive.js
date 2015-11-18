;(function() {
    'use strict';

    angular
        .module('todo')
        .directive('todoList', todoList);

    /** @ngInject */
    function todoList(todoRepository) {
        todos = todoRepository;

        return {
            templateUrl: 'templates/todo-list.html',
            restrict: 'E',
            scope: {},
            link: linkFn
        };
    }

    var todos;

    function linkFn(scope) {
        scope.vm = {
            todos: todos.getTodo()
        };
    }
})();
