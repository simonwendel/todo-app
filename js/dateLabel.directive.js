import moment from 'moment';
import dateLabelTemplate from 'templates/date-label.html!text';

function dateLabelDirective() {
  return {
    template: dateLabelTemplate,
    restrict: 'E',
    scope: {},
    link: linkFn
  }
}

function linkFn(scope) {
    scope.vm = {
      date: moment().format('L')
    }
}

export { dateLabelDirective };
