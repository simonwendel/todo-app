import 'JamieMason/Jasmine-Matchers';
import { storageFactory } from 'js/storage.factory';
import { Todo } from 'js/types';

let storage;

describe('Factory: storageFactory (storage.factory.js)', () => {

    beforeEach(fixtureSetup);

    describe('Product: storage', () => {

        it('should have an all() function to retrieve todos from storage.', () => {

            expect(storage.all().length).toBe(4);

        });

        it('should have an save() function to save a Todo to storage.', () => {

            storage.save(new Todo({}));
            expect(storage.all().length).toBe(5);

        });

        it('should throw an error if the parameter to save fn is not of type Todo.', () => {

            expect(() => storage.save({})).toThrow();

        });

        it('should return items of type Todo.', () => {

            expect(storage.all().every(t => t instanceof Todo)).toBe(true);

        });

        it('should have a remove fn to delete by id.', () => {

            storage.remove(11);
            expect(storage.all().length).toBe(3);
            expect(storage.all().some(t => t.id === 11)).toBe(false);

        });

        it('should throw from remove fn when no object matching id is found.', () => {

            expect(() => storage.remove()).toThrow();
            expect(() => storage.remove(1000)).toThrow();
            expect(storage.all().length).toBe(4);

        });

    });

});

function fixtureSetup() {
    storage = storageFactory();
}
