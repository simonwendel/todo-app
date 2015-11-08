;(function() {
    'use strict';

    angular
        .module('todo')
        .directive('newTodoButton', newTodoButton);

    /** @ngInject */
    function newTodoButton() {
        return {
            templateUrl: 'templates/new-todo-button.html',
            restrict: 'E',
            scope: {},
            controller: NewTodoButtonController,
            controllerAs: 'vm'
        };
    }

    function NewTodoButtonController() {
    }
})();
