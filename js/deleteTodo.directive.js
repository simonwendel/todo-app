import deleteTodoTemplate from 'templates/delete-todo.html!text';

let ionicModal,
    repository;

deleteTodoDirective.$inject = ['$ionicModal', 'repository'];
function deleteTodoDirective($ionicModal, repositoryFactory) {
    ionicModal = $ionicModal;
    repository = repositoryFactory;

    return {
        restrict: 'A',
        scope: {
            cDeleteTodo: '='
        },
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

    scope.vm.removeTodo = () => {
        repository.remove(scope.cDeleteTodo.id);
        scope.modal.remove();
    };

    element.on('click', scope.vm.openModal);
}

export { deleteTodoDirective };
