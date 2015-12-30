import markAsDoneTemplate from 'templates/mark-as-done.html!text';

let ionicModal,
    repository;

markAsDoneDirective.$inject = ['$ionicModal', 'repository'];
function markAsDoneDirective($ionicModal, repositoryFactory) {
    ionicModal = $ionicModal;
    repository = repositoryFactory;

    return {
        restrict: 'A',
        scope: {
            cMarkAsDone: '='
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
        .fromTemplate(markAsDoneTemplate, {
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

    scope.vm.markTodo = () => {
        repository.markTodo(scope.cMarkAsDone);
        scope.modal.hide();
    };

    element.on('click', scope.vm.openModal);
}

export { markAsDoneDirective };
