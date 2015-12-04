import dateLabelTemplate from 'templates/date-label.html!text';

let todoViewService;

dateLabelDirective.$inject = ['todoView'];
function dateLabelDirective(todoView) {
    todoViewService = todoView;
    return {
          template: dateLabelTemplate,
          restrict: 'E',
          scope: {},
          link: linkFn
      }
}

function linkFn(scope) {
    scope.vm = {
        date: todoViewService.getDate()
    }
}

export { dateLabelDirective };
