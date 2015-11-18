;(function() {
    'use strict';

    angular
        .module('todo')
        .factory('todoStorage', todoStorage);

    function todoStorage() {
        return {
            all: function() {}
        };
    }
})();
