import utilityHeaderTemplate from 'templates/utility-header.html!text';

function utilityHeader() {
    return {
        template: utilityHeaderTemplate,
        restrict: 'E',
        transclude: true
    };
}

export { utilityHeader };
