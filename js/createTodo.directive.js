import createTodoTemplate from 'templates/create-todo.html!text';

let ionicModal,
    colors,
    repository,
    view;

createTodoDirective.$inject = ['$ionicModal', 'colors', 'repository', 'view'];
function createTodoDirective($ionicModal, colorsFactory, repositoryFactory, viewFactory) {
    ionicModal = $ionicModal;
    colors = colorsFactory.getAll();
    repository = repositoryFactory;
    view = viewFactory;

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
        .fromTemplate(createTodoTemplate, {
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

    scope.vm.saveNewTodo = () => {
        saveNewTodo(scope);
        scope.modal.hide();
    };

    scope.vm.availableColors = colors;
    scope.vm.selectedColor = colors[0];

    scope.$on('$destroy', () => {
        scope.modal.remove();
    });

    element.on('click', scope.vm.openModal);
}

function saveNewTodo(scope) {
    let item = {
        title: scope.vm.title,
        description: scope.vm.description,
        color: scope.vm.selectedColor,
        recurring: scope.vm.reccuring,
        created: view.viewingDate()
    };

    repository.newTodo(item);
}

export { createTodoDirective };
