import createTodoTemplate from 'templates/create-todo.html!text';

let ionicModal,
    colors,
    repository,
    view,
    scope,
    modal;

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

function linkFn(scp, element) {
    scope = scp;
    modal = createModal();
    element.on('click', openModal);
    setupScope();
}

function createModal() {
    return ionicModal
        .fromTemplate(createTodoTemplate, {
            scope: scope,
            animation: 'slide-in-up'
        });
}

function setupScope() {
    scope.vm = {};

    scope.vm.closeModal = closeModal;
    scope.vm.saveNewTodo = saveNewTodo;

    scope.vm.availableColors = colors;
    scope.vm.selectedColor = colors[0];

    scope.$on('$destroy', () => {
        modal.remove();
    });
}

function saveNewTodo() {
    if (scope.createTodoForm) {
        scope.createTodoForm.$validate();
    }

    let item = {
        title: scope.vm.title,
        description: scope.vm.description,
        color: scope.vm.selectedColor,
        recurring: scope.vm.recurring >>> 0,
        created: view.viewingDate()
    };

    repository.newTodo(item);
    closeModal();
}

function openModal() {
    modal.show();
}

function closeModal() {
    modal.hide();
}

export { createTodoDirective };
