import 'JamieMason/Jasmine-Matchers';
import { storageFactory } from 'js/storage.factory';

const storage = storageFactory();

describe('Factory: storageFactory (storage.factory.js)', () => {

    describe('Product: storage', () => {

        it('should have an all() function to retrieve todos from storage.', () => {

            expect(storage.all().length).toBe(4);

        });

        it('should have an save() function to save a todo to storage.', () => {

            storage.save({});
            expect(storage.all().length).toBe(5);

        });

    });

});
