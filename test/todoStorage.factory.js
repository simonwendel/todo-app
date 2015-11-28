import 'JamieMason/Jasmine-Matchers';
import { todoStorage } from 'js/todoStorage.factory';

describe('Factory: todoStorage (todoStorage.factory.js)', () => {

    const storage = todoStorage();

    it('should have an all() function to retrieve todos from storage.', () => {

        expect(storage.all().length).toBe(4);

    });

    it('should have an save() function to save a todo to storage.', () => {

        storage.save({});
        expect(storage.all().length).toBe(5);

    });

});
