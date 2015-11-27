;(function() {
    'use strict';

    var todoStorage;

    describe('Factory: todoStorage (todoStorage.factory.js)', function() {

        beforeEach(module('todo'));

        beforeEach(inject(fixtureSetup));

        it('should be defined and accessible.', function() {
            expect(todoStorage).toBeDefined();
        });

        it('should have an all() function to retrieve todos from storage.', function() {
            expect(todoStorage.all().length).toBe(4);
        });

        it('should have an save() function to save a todo to storage.', function() {
            todoStorage.save({});
            expect(todoStorage.all().length).toBe(5);
        });
    });

    function fixtureSetup(_todoStorage_) {
        todoStorage = _todoStorage_;
    }
})();
