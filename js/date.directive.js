import dateTemplate from 'templates/date.html!text';

let view;

dateDirective.$inject = ['view'];
function dateDirective(viewFactory) {
    view = viewFactory;
    return {
          template: dateTemplate,
          restrict: 'E',
          scope: {},
          link: linkFn
      }
}

function linkFn(scope) {
    scope.vm = {
        date: view.getDate()
    };

    scope.$watch(
        s => view.getDate(),
        v => scope.vm.date = v);
}

export { dateDirective };
