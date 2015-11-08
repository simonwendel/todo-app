;(function() {
    'use strict';

    angular
        .module('todo')
        .directive('utilityFooter', utilityFooter);

    /** @ngInject */
    function utilityFooter() {
        return {
            templateUrl: 'templates/utility-footer.html',
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: UtilityFooterController,
            controllerAs: 'vm'
        };
    }

    function UtilityFooterController() {
    }
})();
