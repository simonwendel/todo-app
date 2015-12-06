import headerTemplate from 'templates/header.html!text';

let view;

headerDirective.$inject = ['view'];
function headerDirective(viewFactory) {
    view = viewFactory;

    return {
        template: headerTemplate,
        restrict: 'E',
        transclude: true,
        scope: {},
        link: linkFn
    };
}

function linkFn(scope) {
    scope.vm = {
        nextDay: view.nextDay,
        previousDay: view.previousDay
    }
}

export { headerDirective };
