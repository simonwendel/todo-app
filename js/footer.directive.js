import footerTemplate from 'templates/footer.html!text';

function footerDirective() {
    return {
        template: footerTemplate,
        restrict: 'E',
        transclude: true
    };
}

export { footerDirective };
