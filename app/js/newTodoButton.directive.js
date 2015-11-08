;(function() {
    'use strict';

    angular
        .module('todo')
        .directive('newTodoButton', newTodoButton);

    function newTodoButton() {
        return {
            templateUrl: 'templates/new-todo-button.html',
            restrict: 'E',
            scope: {},
            controller: NewTodoButtonController,
            controllerAs: 'vm'
        };
    }

    /** @ngInject */
    function NewTodoButtonController($scope, $ionicModal) {
        var vm = this;

        $ionicModal.fromTemplateUrl('templates/new-todo-button.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            vm.modal = modal;
        });

        vm.openModal = function() {
            vm.modal.show();
        };

        vm.closeModal = function() {
            vm.modal.hide();
        };
    }
})();
