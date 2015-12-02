import 'JamieMason/Jasmine-Matchers';
import { todoStorageFactory } from 'js/todoStorage.factory';

const todoStorage = todoStorageFactory();

describe('Factory: todoStorageFactory (todoStorage.factory.js)', () => {

    describe('Product: todoStorage', () => {

        it('should have an all() function to retrieve todos from storage.', () => {

            expect(todoStorage.all().length).toBe(4);

        });

        it('should have an save() function to save a todo to storage.', () => {

            todoStorage.save({});
            expect(todoStorage.all().length).toBe(5);

        });

    });

});
