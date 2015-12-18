import headerTemplate from 'templates/header.html!text';

let view;

headerDirective.$inject = ['view', 'dateUtility'];
function headerDirective(viewFactory) {
    view = viewFactory;

    return {
        template: headerTemplate,
        restrict: 'E',
        scope: {},
        link: linkFn
    };
}

function linkFn(scope) {
    scope.vm = {
        nextDay: view.nextDay,
        previousDay: view.previousDay
    };

    update(scope);
    view.subscribe(() => update(scope), scope);
}

function update(scope) {
    scope.vm.date = view.showDate();
}

export { headerDirective };
