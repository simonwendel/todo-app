import utilityFooterTemplate from 'templates/utility-footer.html!text';

function utilityFooter() {
    return {
        template: utilityFooterTemplate,
        restrict: 'E',
        transclude: true
    };
}

export { utilityFooter };
