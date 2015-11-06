;(function() {
    'use strict';

    angular
        .module('todo')
        .factory('dateUtility', dateUtility);

    /** @ngInject */
    function dateUtility() {
        return {
            addDays: addDays
        };
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
})();
