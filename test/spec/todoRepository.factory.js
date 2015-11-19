;(function() {
    'use strict';

    var provide,
        todoRepository,
        todoStorage,
        notificationService,
        todoNotification;

    describe('Factory: todoRepository (todoRepository.factory.js)', function() {

        beforeEach(module('todo', function fetchProvide($provide) {
            provide = $provide;
        }));

        beforeEach(inject(fixtureSetup));

        it('should be defined and accessible through the angular module system.', function() {
            expect(todoRepository).toBeDefined();
        });

        it('should build a notification service with appropriate event name.', function() {
            expect(notificationService.build.calledWith('todoRepository.update')).toBeTruthy();
        });

        it('should expose a subscriber interface using notificationService.', function() {
            todoRepository.subscribe(function() {});
            expect(todoNotification.subscribe.called).toBeTruthy();
        });

        it('should call the all() function of todoStorage to get todo items..', function() {
            todoRepository.getTodo();
            expect(todoStorage.all.called).toBeTruthy();
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

        it('should call the save() function on todoStorage to save a new todo item.', function() {
            todoRepository.newTodo({});
            expect(todoStorage.save.called).toBeTruthy();
        });

        it('should throw exception when undefined todo item is saved.', function() {
            expect(function() {
                todoRepository.newTodo(null);
            }).toThrow();
        });

        it('should not save when undefined todo item is saved.', function() {
            try {
                todoRepository.newTodo(null);
            } catch (e) {}

            expect(todoStorage.save.called).toBeFalsy();
        });
    });

    function fixtureSetup() {
        todoStorage = {
            all: sinon.stub().returns([
                { id: 1 },
                { id: 10 },
                { id: 11 },
                { id: 21 }
            ]),
            save: sinon.spy()
        };

        provide.value('todoStorage', todoStorage);

        todoNotification = {
            subscribe: sinon.spy()
        };

        notificationService = {
            build: sinon.stub().returns(todoNotification)
        };

        provide.value('notificationService', notificationService);

        inject(function(_todoRepository_) {
            todoRepository = _todoRepository_;
        });
    }
})();
