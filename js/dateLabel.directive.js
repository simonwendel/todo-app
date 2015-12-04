import dateLabelTemplate from 'templates/date-label.html!text';

let todoView;

dateLabelDirective.$inject = ['todoView'];
function dateLabelDirective(todoViewProvider) {
    todoView = todoViewProvider;
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
    }
}

export { dateLabelDirective };
