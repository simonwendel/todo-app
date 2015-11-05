;(function () {
    'use strict';

    angular
        .module('todo')
        .factory('todoRepository', todoRepository);

    /** @ngInject */
    function todoRepository() {
        return {};
    }
})();
