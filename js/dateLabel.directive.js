import dateLabelTemplate from 'templates/date-label.html!text';

let todoView;

dateLabelDirective.$inject = ['todoView'];
function dateLabelDirective(todoViewFactory) {
    todoView = todoViewFactory;
    return {
          template: dateLabelTemplate,
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

export { dateLabelDirective };
