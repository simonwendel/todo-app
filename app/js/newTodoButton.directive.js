;(function() {
    'use strict';

    angular
        .module('todo')
        .directive('newTodoButton', newTodoButton);

    /** @ngInject */
    function newTodoButton($ionicModal, colors) {
        ionicModal = $ionicModal;
        availableColors = colors;

        return {
            restrict: 'A',
            scope: {},
            link: linkFn
        };
    }

    var ionicModal,
        availableColors;

    function linkFn(scope, element, attr) {
        createModal(scope)
            .then(function(modal) {
                setupScope(modal, scope, element)
            });
    }

    function createModal(scope) {
        return ionicModal
            .fromTemplateUrl('templates/new-todo-button.modal.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
    }

    function setupScope(modal, scope, element) {
        scope.modal = modal;
        scope.vm = {};

        scope.vm.openModal = function() {
            scope.modal.show();
        };

        scope.vm.closeModal = function() {
            scope.modal.hide();
        };

        scope.vm.availableColors = availableColors;
        scope.vm.selectedColor = availableColors[0];

        scope.$on('$destroy', function() {
            scope.modal.remove();
        });

        element.on('click', scope.vm.openModal);
    }
})();
