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
      }
}

function linkFn(scope) {
    scope.vm = {
        date: view.getDate(),
        viewingHistory: isHistoric()
    };

    scope.$watch(
        s => view.getDate(),
        v => {
            scope.vm.date = v;
            scope.vm.viewingHistory = isHistoric();
        });
}

function isHistoric() {
    return date.compareDatePart(view.getDate(), date.now()) < 0;
}

export { dateDirective };
