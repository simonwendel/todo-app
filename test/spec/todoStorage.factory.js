;(function() {
    'use strict';

    var todoStorage;

    describe('Factory: todoStorage (todoStorage.factory.js)', function() {

        beforeEach(module('todo'));

        beforeEach(inject(fixtureSetup));

        it('should be defined and accessible.', function() {
            expect(todoStorage).toBeDefined();
        });
    });

    function fixtureSetup(_todoStorage_) {
        todoStorage = _todoStorage_;
    }
})();
