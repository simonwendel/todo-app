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

    scope.vm = {
        closeModal: closeModal,
        saveNewTodo: saveNewTodo,
        availableColors: colors,
        selectedColor: colors[0]
    };

    scope.$on('$destroy', () => {
        modal.remove();
    });

    element.on('click', openModal);
    resetModel();
}

function createModal() {
    return ionicModal
        .fromTemplate(createTodoTemplate, {
            scope: scope,
            animation: 'slide-in-up'
        });
}

function resetModel() {
    scope.vm.title = '';
    scope.vm.description = '';
    scope.vm.recurring = 0;
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
    resetModel();
}

export { createTodoDirective };
