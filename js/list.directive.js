import listTemplate from 'templates/list.html!text';

let repository,
    savedScope;

listDirective.$inject = ['repository'];
function listDirective(repositoryFactory) {
    repository = repositoryFactory;

    return {
        template: listTemplate,
        restrict: 'E',
        scope: {},
        link: linkFn
    };
}

function linkFn(scope) {
    savedScope = scope;

    repository.subscribe(savedScope, updateList);
    savedScope.vm = {};
    updateList();
}

function updateList() {
    savedScope.vm.todos = repository.getTodo();
}

export { listDirective };
