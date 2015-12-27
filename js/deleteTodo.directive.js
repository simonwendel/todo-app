import deleteTodoTemplate from 'templates/delete-todo.html!text';

let ionicModal;

deleteTodoDirective.$inject = ['$ionicModal'];
function deleteTodoDirective($ionicModal) {
    ionicModal = $ionicModal;

    return {
        restrict: 'A',
        scope: {},
        link: linkFn
    };
}

function linkFn(scope, element) {
    let modal = createModal(scope);
    setupScope(modal, scope, element);
}

function createModal(scope) {
    return ionicModal
        .fromTemplate(deleteTodoTemplate, {
            scope: scope,
            animation: 'slide-in-up'
        });
}

function setupScope(modal, scope, element) {
    scope.modal = modal;
    scope.vm = {};

    scope.vm.openModal = () =>
        scope.modal.show();

    scope.vm.closeModal = () =>
        scope.modal.hide();

    scope.$on('$destroy', () => {
        scope.modal.remove();
    });

    element.on('click', scope.vm.openModal);
}


export { deleteTodoDirective };
