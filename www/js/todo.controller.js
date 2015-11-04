;(function () {
    'use strict';

    angular
        .module('todo')
        .controller('TodoController', todoController);

    /** @ngInject */
    function todoController()
    {
        var vm = this;
        return vm;
    }
})();
