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
})();
