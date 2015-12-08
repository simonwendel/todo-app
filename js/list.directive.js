import listTemplate from 'templates/list.html!text';

let view,
    savedScope;

listDirective.$inject = ['view'];
function listDirective(viewFactory) {
    view = viewFactory;

    return {
        template: listTemplate,
        restrict: 'E',
        scope: {},
        link: linkFn
    };
}

function linkFn(scope) {
    savedScope = scope;

    view.subscribe(savedScope, updateList);
    savedScope.vm = {};
    updateList();
}

function updateList() {
    savedScope.vm.todos = view.getTodo();
}

export { listDirective };
