;(function () {
    'use strict';

    var todoRepository;

    describe('Factory: todoRepository (todoRepository.service.js)', function () {

        beforeEach(module('todo'));

        beforeEach(inject(fixtureSetup));

        it('should be defined and accessible through the angular module system.', function () {
            expect(todoRepository).toBeDefined();
        });

        it('should have a function for retrieving all todo items.', function () {
            expect(todoRepository.getTodo().length).toBe(4);
        });

        it('should have a function for retrieving one todo item by id.', function () {
            var todo = todoRepository.getTodo(11);
            expect(todo.id).toBe(11);
        });

        it('should throw exception when no todo with specified id exists in the repository.', function () {
            expect(function() {
                todoRepository.getTodo(100);
            }).toThrow('No such item found.');
        });
    });

    function fixtureSetup(_todoRepository_) {
        todoRepository = _todoRepository_;
    }
})();
