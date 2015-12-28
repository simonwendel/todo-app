import 'JamieMason/Jasmine-Matchers';
import { Todo, Color } from 'js/types';
import { repositoryFactory } from 'js/repository.factory';

const grace = new Date('December 9, 1906');

let repository,
    storageMock,
    notificationMock,
    dateUtilityMock,
    notificationChannel,
    anonymousTodo,
    someTodo;

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

            let todo = repository.getTodo(11);
            expect(todo.id).toBe(11);

        });

        it('should throw exception when no todo with specified id exists in the repository.', () => {

            expect(() => repository.getTodo(100)).toThrow();

        });

        it('should call the save() function on storage to save a new todo item.', () => {

            repository.newTodo(anonymousTodo);
            expect(storageMock.save.called).toBe(true);

        });

        it('should call the notify function notifying subscribers on newTodo.', () => {

            repository.newTodo(anonymousTodo);
            expect(notificationChannel.notify.called).toBe(true);

        });

        it('should throw exception when null todo item is saved.', () => {

            expect(() => repository.newTodo(null)).toThrow();

        });

        it('should not notify subscribers if todo item to newTodo is null.', () => {

            expect(() => repository.newTodo(null)).toThrow();
            expect(notificationChannel.notify.called).toBe(false);

        });

        it('should not save when null todo item is saved.', () => {

            expect(() => repository.newTodo(null)).toThrow();
            expect(storageMock.save.called).toBe(false);

        });

        it('should enforce reccurring to be non-negative in newTodo fn.', () => {

            anonymousTodo.recurring = -1;
            expect(() => repository.newTodo(anonymousTodo)).toThrow();

        });

        it('should enforce types to the newTodo fn.', () => {

            let error = {
                title: 3,
                description: true,
                created: 'some date, right?',
                recurring: 0.5,
                color: 'blue'
            };

            expect(() => repository.newTodo(error)).toThrow();

        });

        it('should enforce non-optional properties of new todo in newTodo fn.', () => {

            let error = {
                description: 'some descr...'
            };

            expect(() => repository.newTodo(error)).toThrow();

        });

        it('should use the storage remove fn to remove items.', () => {

            repository.removeTodo(1);
            expect(storageMock.remove.called).toBe(true);

        });

        it('should notify subscribers after remove fn called.', () => {

            repository.removeTodo(1);
            expect(notificationChannel.notify.called).toBe(true);

        });

        it('should enforce parameter types to remove fn.', () => {

            expect(() => repository.removeTodo({})).toThrow();

        });

        it('should update the nextOcurrance prop on the todo item when marking as done.', () => {

            repository.markTodo(someTodo);

            expect(dateUtilityMock.now.called).toBe(true);
            expect(dateUtilityMock.addDays.calledWith(someTodo.recurring)).toBe(true);

            let updatedOccurrance = storageMock.update.args[0][0].nextOccurrance;
            expect(updatedOccurrance).toBe(grace);

        });

        it('should enforce parameter types to markTodo fn.', () => {

            expect(() => repository.markTodo({})).toThrow();

        });

        it('should use the storage update fn to mark items as done.', () => {

            repository.markTodo(someTodo);
            expect(storageMock.update.called).toBe(true);

        });

        it('should notify subscribers after markTodo fn called.', () => {

            repository.markTodo(someTodo);
            expect(notificationChannel.notify.called).toBe(true);

        });

    });

});

function fixtureSetup() {
    anonymousTodo = {
        title: 'title',
        created: new Date(),
        recurring: 10,
        color: new Color('', '')
    };

    someTodo = new Todo(anonymousTodo);

    storageMock = {
        all: sinon.stub().returns([
            new Todo({ id: 1 }),
            new Todo({ id: 10 }),
            new Todo({ id: 11 }),
            new Todo({ id: 21 })
        ]),
        save: sinon.stub(),
        remove: sinon.stub(),
        update: sinon.stub()
    };

    notificationChannel = {
        subscribe: sinon.stub(),
        notify: sinon.stub()
    };

    notificationMock = {
        create: sinon.stub().returns(notificationChannel)
    };

    dateUtilityMock = {
        addDays: sinon.stub().returns(grace),
        now: sinon.stub()
    };

    repository = repositoryFactory(storageMock, notificationMock, dateUtilityMock);
}
