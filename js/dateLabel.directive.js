import dateLabelTemplate from 'templates/date-label.html!text';

let momentService;

dateLabelDirective.$inject = ['moment'];
function dateLabelDirective(moment) {
    momentService = moment;
    return {
          template: dateLabelTemplate,
          restrict: 'E',
          scope: {},
          link: linkFn
      }
}

function linkFn(scope) {
    scope.vm = {
        date: momentService().format('L')
    }
}

export { dateLabelDirective };
