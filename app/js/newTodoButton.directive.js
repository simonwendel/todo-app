;(function() {
    'use strict';

    angular
        .module('todo')
        .directive('newTodoButton', newTodoButton);

    /** @ngInject */
    function newTodoButton($ionicModal) {
        ionicModal = $ionicModal;

        return {
            restrict: 'A',
            scope: {},
            link: linkFn
        };
    }

    var ionicModal;

    function linkFn(scope, element, attr) {
        ionicModal.fromTemplateUrl('templates/new-todo-button.modal.html', {
            scope: scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            scope.modal = modal;
        });

        scope.openModal = function() {
            scope.modal.show();
        };

        scope.closeModal = function() {
            scope.modal.hide();
        };

        scope.$on('$destroy', function() {
            scope.modal.remove();
        });

        element.on('click', scope.openModal);
    }
})();
