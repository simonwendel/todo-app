import 'JamieMason/Jasmine-Matchers';
import { Todo } from 'js/types';
import { repositoryFactory } from 'js/repository.factory';

let repository,
    storageMock,
    notificationMock,
    notificationChannel;

describe('Factory: repositoryFactory (repository.factory.js)', () => {

    beforeEach(fixtureSetup);

    describe('Product: repository', () => {

        it('should create a notification service with appropriate event name.', () => {

            expect(notificationMock.create.calledWith('todoRepositoryFactory.update')).toBe(true);

        });

        it('should expose a subscriber interface using notificationService.', () => {

            repository.subscribe(() => { });
            expect(notificationChannel.subscribe.called).toBe(true);

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
            expect(notificationChannel.notify.called).toBe(true);

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
            expect(notificationChannel.notify.called).toBe(false);

        });

        it('should not save when null todo item is saved.', () => {

            expect(() => {
                repository.newTodo(null);
            }).toThrow();
            expect(storageMock.save.called).toBe(false);

        });

    });

});

function fixtureSetup() {
    storageMock = {
        all: sinon.stub().returns([
            new Todo({ id: 1 }),
            new Todo({ id: 10 }),
            new Todo({ id: 11 }),
            new Todo({ id: 21 })
        ]),
        save: sinon.spy()
    };

    notificationChannel = {
        subscribe: sinon.spy(),
        notify: sinon.spy()
    };

    notificationMock = {
        create: sinon.stub().returns(notificationChannel)
    };

    repository = repositoryFactory(storageMock, notificationMock);
}
