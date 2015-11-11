;(function() {
    'use strict';

    angular
        .module('todo')
        .directive('utilityHeader', utilityHeader);

    function utilityHeader() {
        return {
            templateUrl: 'templates/utility-header.html',
            restrict: 'E',
            transclude: true
        };
    }
})();
