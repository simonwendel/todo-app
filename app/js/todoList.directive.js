;(function () {
    'use strict';

    angular
        .module('todo')
        .directive('todoList', todoList);

    /** @ngInject */
    function todoList() {
        return {
            templateUrl: 'templates/todo-list.html'
        };
    }
})();
