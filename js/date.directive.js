import dateTemplate from 'templates/date.html!text';

let todoView;

dateDirective.$inject = ['todoView'];
function dateDirective(todoViewFactory) {
    todoView = todoViewFactory;
    return {
          template: dateTemplate,
          restrict: 'E',
          scope: {},
          link: linkFn
      }
}

function linkFn(scope) {
    scope.vm = {
        date: todoView.getDate()
    };

    scope.$watch(
        s => todoView.getDate(),
        v => scope.vm.date = v);
}

export { dateDirective };
