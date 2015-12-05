import utilityHeaderTemplate from 'templates/utility-header.html!text';

let todoView;

utilityHeaderDirective.$inject = ['todoView'];
function utilityHeaderDirective(todoViewFactory) {
    todoView = todoViewFactory;

    return {
        template: utilityHeaderTemplate,
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

export { utilityHeaderDirective };
