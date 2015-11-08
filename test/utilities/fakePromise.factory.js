;(function() {
    'use strict';

    angular
        .module('todo.test.utils')
        .factory('fakePromise', fakePromise);

    var expected;

    function fakePromise()
    {
        return {
            init: init,
            resolved: fakeResolved
        };
    }

    function init(expectedResult) {
        expected = expectedResult;
    }

    function fakeResolved() {
        return {
            then: function(callback) {
                callback(expected);
            }
        }
    }
})();
