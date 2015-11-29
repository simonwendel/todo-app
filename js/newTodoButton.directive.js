import newTodoButtonModalTemplate from 'templates/new-todo-button.modal.html!text';

function newTodoButton($ionicModal, colors, todoRepository) {
    ionicModal = $ionicModal;
    availableColors = colors;
    repository = todoRepository;

    return {
        restrict: 'A',
        scope: {},
        link: linkFn
    };
}

let ionicModal,
    availableColors,
    repository;

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

    scope.vm.openModal = function() {
        scope.modal.show();
    };

    scope.vm.closeModal = function() {
        scope.modal.hide();
    };

    scope.vm.saveNewTodo = function() {
        saveNewTodo(scope);
        scope.modal.hide();
    };

    scope.vm.availableColors = availableColors;
    scope.vm.selectedColor = availableColors[0];

    scope.$on('$destroy', function() {
        scope.modal.remove();
    });

    element.on('click', scope.vm.openModal);
}

function saveNewTodo(scope) {
    var item = {
        title: scope.vm.title,
        description: scope.vm.description,
        color: scope.vm.selectedColor,
        recurring: scope.vm.reccuring
    };

    repository.newTodo(item);
}

export { newTodoButton };
