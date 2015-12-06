import angular from 'angular';

platformClassDirective.$inject = ['platform'];
function platformClassDirective(platform) {
    return {
        restrict: 'A',
        scope: {},
        link: (scope, element) => {
            angular
                .element(element)
                .addClass('platform-' + platform);
        }
    }
}

export { platformClassDirective };