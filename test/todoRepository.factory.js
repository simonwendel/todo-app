import 'JamieMason/Jasmine-Matchers';
import { todoRepositoryFactory } from 'js/todoRepository.factory';

let todoRepository,
    todoStorage,
    notificationService,
    todoNotification;

describe('Factory: todoRepository (todoRepository.factory.js)', () => {

    beforeEach(fixtureSetup);

    it('should be defined and accessible through the angular module system.', () => {

        expect(todoRepository).toBeDefined();

    });

    it('should build a notification service with appropriate event name.', () => {

        expect(notificationService.build.calledWith('todoRepositoryFactory.update')).toBeTruthy();

    });

    it('should expose a subscriber interface using notificationService.', () => {

        todoRepository.subscribe(() => {});
        expect(todoNotification.subscribe.called).toBeTruthy();

    });

    it('should call the all() function of todoStorage to get todo items..', () => {

        todoRepository.getTodo();
        expect(todoStorage.all.called).toBeTruthy();

    });

    it('should have a function for retrieving one todo item by id.', () => {

        var todo = todoRepository.getTodo(11);
        expect(todo.id).toBe(11);

    });

    it('should throw exception when no todo with specified id exists in the repository.', () => {

        expect(() => {
            todoRepository.getTodo(100);
        }).toThrow();

    });

    it('should call the save() function on todoStorage to save a new todo item.', () => {

        todoRepository.newTodo({});
        expect(todoStorage.save.called).toBeTruthy();

    });

    it('should call the notify function notifying subscribers on newTodo.', () => {

        todoRepository.newTodo({});
        expect(todoNotification.notify.called).toBeTruthy();

    });

    it('should throw exception when null todo item is saved.', () => {

        expect(() => {
            todoRepository.newTodo(null);
        }).toThrow();

    });

    it('should not notify subscribers if todo item to newTodo is null.', () => {

        expect(() => {
            todoRepository.newTodo(null);
        }).toThrow();
        expect(todoNotification.notify.called).toBeFalsy();

    });

    it('should not save when null todo item is saved.', () => {

        try {
            todoRepository.newTodo(null);
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

    todoRepository = todoRepositoryFactory(todoStorage, notificationService);
}
