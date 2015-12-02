import newTodoButtonModalTemplate from 'templates/new-todo-button.modal.html!text';

let ionicModal,
    availableColors,
    repository;

function newTodoButtonDirective($ionicModal, colors, todoRepository) {
    ionicModal = $ionicModal;
    availableColors = colors.getAll();
    repository = todoRepository;

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
        .fromTemplate(newTodoButtonModalTemplate, {
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

    scope.vm.availableColors = availableColors;
    scope.vm.selectedColor = availableColors[0];

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
        recurring: scope.vm.reccuring
    };

    repository.newTodo(item);
}

export { newTodoButtonDirective };
