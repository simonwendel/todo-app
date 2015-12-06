import 'JamieMason/Jasmine-Matchers';
import { repositoryFactory } from 'js/repository.factory';

let repository,
    storageMock,
    notificationService,
    todoNotification;

describe('Factory: repositoryFactory (repository.factory.js)', () => {

    beforeEach(fixtureSetup);

    describe('Product: repository', () => {

        it('should build a notification service with appropriate event name.', () => {

            expect(notificationService.build.calledWith('todoRepositoryFactory.update')).toBe(true);

        });

        it('should expose a subscriber interface using notificationService.', () => {

            repository.subscribe(() => {});
            expect(todoNotification.subscribe.called).toBe(true);

        });

        it('should call the all() function of storage to get todo items..', () => {

            repository.getTodo();
            expect(storageMock.all.called).toBe(true);

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

        it('should call the save() function on storage to save a new todo item.', () => {

            repository.newTodo({});
            expect(storageMock.save.called).toBe(true);

        });

        it('should call the notify function notifying subscribers on newTodo.', () => {

            repository.newTodo({});
            expect(todoNotification.notify.called).toBe(true);

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
            expect(todoNotification.notify.called).toBe(false);

        });

        it('should not save when null todo item is saved.', () => {

            try {
                repository.newTodo(null);
            } catch (e) {
            }

            expect(storageMock.save.called).toBe(false);

        });

    });
});

function fixtureSetup() {
    storageMock = {
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

    repository = repositoryFactory(storageMock, notificationService);
}
