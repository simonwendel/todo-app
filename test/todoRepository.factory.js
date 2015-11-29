import 'JamieMason/Jasmine-Matchers';
import { todoRepository } from 'js/todoRepository.factory';

let repository,
    todoStorage,
    notificationService,
    todoNotification;

describe('Factory: todoRepository (todoRepository.factory.js)', () => {

    beforeEach(fixtureSetup);

    it('should be defined and accessible through the angular module system.', () => {

        expect(repository).toBeDefined();

    });

    it('should build a notification service with appropriate event name.', () => {

        expect(notificationService.build.calledWith('todoRepository.update')).toBeTruthy();

    });

    it('should expose a subscriber interface using notificationService.', () => {

        repository.subscribe(() => {});
        expect(todoNotification.subscribe.called).toBeTruthy();

    });

    it('should call the all() function of todoStorage to get todo items..', () => {

        repository.getTodo();
        expect(todoStorage.all.called).toBeTruthy();

    });

    it('should have a function for retrieving one todo item by id.', () => {

        var todo = repository.getTodo(11);
        expect(todo.id).toBe(11);

    });

    it('should throw exception when no todo with specified id exists in the repository.', () => {

        expect(() => {
            repository.getTodo(100);
        }).toThrow();

    });

    it('should call the save() function on todoStorage to save a new todo item.', () => {

        repository.newTodo({});
        expect(todoStorage.save.called).toBeTruthy();

    });

    it('should call the notify function notifying subscribers on newTodo.', () => {

        repository.newTodo({});
        expect(todoNotification.notify.called).toBeTruthy();

    });

    it('should throw exception when null todo item is saved.', () => {

        expect(() => {
            repository.newTodo(null);
        }).toThrow();

    });

    it('should not notify subscribers if todo item to newTodo is null.', () => {

        expect(() => {
            repository.newTodo(null);
        }).toThrow();
        expect(todoNotification.notify.called).toBeFalsy();

    });

    it('should not save when null todo item is saved.', () => {

        try {
            repository.newTodo(null);
        } catch (e) {
        }

        expect(todoStorage.save.called).toBeFalsy();

    });
});

function fixtureSetup() {
    todoStorage = {
        all: sinon.stub().returns([
            {id: 1},
            {id: 10},
            {id: 11},
            {id: 21}
        ]),
        save: sinon.spy()
    };

    todoNotification = {
        subscribe: sinon.spy(),
        notify: sinon.spy()
    };

    notificationService = {
        build: sinon.stub().returns(todoNotification)
    };

    repository = todoRepository(todoStorage, notificationService);
}
