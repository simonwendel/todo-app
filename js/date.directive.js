import dateTemplate from 'templates/date.html!text';

let view,
    date;

dateDirective.$inject = ['view', 'dateUtility'];

function dateDirective(viewFactory, dateUtility) {
    view = viewFactory;
    date = dateUtility;

    return {
        template: dateTemplate,
        restrict: 'E',
        scope: {},
        link: linkFn
    };
}

function linkFn(scope) {
    scope.vm = {};
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

export {
    dateDirective
};
