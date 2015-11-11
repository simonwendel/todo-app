;(function() {
    'use strict';

    angular
        .module('todo')
        .directive('utilityFooter', utilityFooter);

    function utilityFooter() {
        return {
            templateUrl: 'templates/utility-footer.html',
            restrict: 'E',
            transclude: true
        };
    }
})();
