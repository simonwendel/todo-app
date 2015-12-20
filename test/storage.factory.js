import 'JamieMason/Jasmine-Matchers';
import { storageFactory } from 'js/storage.factory';
import { Todo } from 'js/types';

const storage = storageFactory();

describe('Factory: storageFactory (storage.factory.js)', () => {

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

    });

});
