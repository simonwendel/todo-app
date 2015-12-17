import headerTemplate from 'templates/header.html!text';

let view,
    date;

headerDirective.$inject = ['view', 'dateUtility'];
function headerDirective(viewFactory, dateUtility) {
    view = viewFactory;
    date = dateUtility;

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
    scope.vm.viewingHistory = isHistoric();
}

function isHistoric() {
    return date.compareDatePart(view.today(), date.now()) < 0;
}

export { headerDirective };
