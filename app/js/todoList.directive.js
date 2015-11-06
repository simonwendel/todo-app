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
            controller: TodoListController,
            controllerAs: 'vm'
        };
    }

    var todos,
        vm;

    function TodoListController() {
        vm = this;

        vm.todos = todos.getTodo();

        return vm;
    }
})();
