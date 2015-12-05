import headerTemplate from 'templates/header.html!text';

let todoView;

headerDirective.$inject = ['todoView'];
function headerDirective(todoViewFactory) {
    todoView = todoViewFactory;

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
        nextDay: todoView.nextDay,
        previousDay: todoView.previousDay
    }
}

export { headerDirective };
