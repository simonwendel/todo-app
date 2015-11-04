;(function () {
    'use strict';

    var controller;

    describe('Controller: TodoController (todo.controller.js)', function () {

        beforeEach(module('todo'));

        beforeEach(inject(fixtureSetup));

        it('should be defined and accesible through angular module system.', function () {
            expect(controller).toBeDefined();
        });
    });

    function fixtureSetup($controller) {
        controller = $controller('TodoController');
    }
})();
