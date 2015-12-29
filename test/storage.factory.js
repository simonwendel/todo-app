import 'JamieMason/Jasmine-Matchers';
import { preferences } from 'js/config/preferences';
import { staticTodos } from 'test/utilities/staticTodos';
import { storageFactory } from 'js/storage.factory';
import { Todo } from 'js/types';

let storage,
    browserLocalStorageMock;

describe('Factory: storageFactory (storage.factory.js)', () => {

    beforeEach(fixtureSetup);

    describe('Product: storage', () => {

        it('should get the last saved state from browser local storage.', () => {

            expect(browserLocalStorageMock.getArray.calledWith(preferences.storageKey)).toBe(true);

        });

        it('should have an all() function to retrieve todos from storage.', () => {

            expect(storage.all().length).toBe(4);

        });

        it('should have a save fn to save a Todo to storage.', () => {

            storage.save(new Todo({}));
            expect(storage.all().length).toBe(5);
            expect(browserLocalStorageMock.setArray.calledWith(preferences.storageKey)).toBe(true);

        });

        it('should throw an error if the parameter to save fn is not of type Todo.', () => {

            expect(() => storage.save({})).toThrow();
            expect(browserLocalStorageMock.setArray.called).toBe(false);

        });

        it('should return items of type Todo.', () => {

            expect(storage.all().every(t => t instanceof Todo)).toBe(true);

        });

        it('should have a remove fn to delete by id.', () => {

            storage.remove(11);
            expect(storage.all().length).toBe(3);
            expect(storage.all().some(t => t.id === 11)).toBe(false);
            expect(browserLocalStorageMock.setArray.calledWith(preferences.storageKey)).toBe(true);

        });

        it('should throw from remove fn when no object matching id is found.', () => {

            expect(() => storage.remove()).toThrow();
            expect(() => storage.remove(1000)).toThrow();
            expect(storage.all().length).toBe(4);
            expect(browserLocalStorageMock.setArray.called).toBe(false);

        });

    });

});

function fixtureSetup() {
    browserLocalStorageMock = {
        getArray: sinon.stub().returns(staticTodos),
        setArray: sinon.stub()
    };

    storage = storageFactory(browserLocalStorageMock, preferences);
}
