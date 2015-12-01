import utilityHeaderTemplate from 'templates/utility-header.html!text';

function utilityHeaderDirective() {
    return {
        template: utilityHeaderTemplate,
        restrict: 'E',
        transclude: true
    };
}

export { utilityHeaderDirective };
