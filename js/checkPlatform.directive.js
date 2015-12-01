import angular from 'angular';

function checkPlatformDirective(platform) {
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

export { checkPlatformDirective };
