;(function() {
    'use strict';

    var todoRepository;

    describe('Factory: todoRepository (todoRepository.factory.js)', function() {

        beforeEach(module('todo'));

        beforeEach(inject(fixtureSetup));

        it('should be defined and accessible through the angular module system.', function() {
            expect(todoRepository).toBeDefined();
        });

        it('should have a function for retrieving all todo items.', function() {
            expect(todoRepository.getTodo().length).not.toBe(0);
        });

        it('should have a function for retrieving one todo item by id.', function() {
            var todo = todoRepository.getTodo(11);
            expect(todo.id).toBe(11);
        });

        it('should throw exception when no todo with specified id exists in the repository.', function() {
            expect(function() {
                todoRepository.getTodo(100);
            }).toThrow();
        });

        it('should have a function for saving a new todo item.', function() {
            var numberOfTodos = todoRepository.getTodo().length;
            todoRepository.newTodo({});
            expect(todoRepository.getTodo().length).toBe(numberOfTodos + 1);
        });

        it('should throw exception when undefined todo item is saved.', function() {
            expect(function() {
                todoRepository.newTodo(null);
            }).toThrow();
        });

        it('should not save when undefined todo item is saved.', function() {
            var numberOfTodos = todoRepository.getTodo().length;

            try {
                todoRepository.newTodo(null);
            } catch (e) {}

            expect(todoRepository.getTodo().length).toBe(numberOfTodos);
        });
    });

    function fixtureSetup(_todoRepository_) {
        todoRepository = _todoRepository_;
    }
})();
