;(function () {
    'use strict';

    angular
        .module('todo')
        .directive('utilityHeader', utilityHeader);

    /** @ngInject */
    function utilityHeader() {
        return {
            templateUrl: 'templates/utility-header.html',
            restrict: 'E',
            scope: {},
            controller: UtilityHeaderController,
            controllerAs: 'vm'
        };
    }

    function UtilityHeaderController() {
    }
})();
