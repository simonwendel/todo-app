import utilityFooterTemplate from 'templates/utility-footer.html!text';

function utilityFooterDirective() {
    return {
        template: utilityFooterTemplate,
        restrict: 'E',
        transclude: true
    };
}

export { utilityFooterDirective };
