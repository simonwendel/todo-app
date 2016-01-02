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

    view.subscribe(updateList, scope);
    savedScope.vm = {
        getItemIcon: getItemIcon
    };

    updateList();
}

function updateList() {
    savedScope.vm.todos = view.getTodo();
}

function getItemIcon(overdue) {
    return overdue ? 'cs-late-warning-icon' : 'ion-record';
}

export { listDirective };
