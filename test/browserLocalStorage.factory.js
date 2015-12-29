import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';
import { browserLocalStorageFactory } from 'js/browserLocalStorage.factory';

let browserLocalStorage;

describe('Factory: browserLocalStorageFactory (browserLocalStorage.factory.js)', () => {

    beforeEach(ng.inject(fixtureSetup));

    describe('Product: browserLocalStorage', () => {

        it('should be able set and get some array to and from local storage.', () => {

            let anArray = [{
                id: 4,
                title: 'title',
                recurring: 5,
                whatever: 'whatever'
            }, {
                id: 5,
                title: 'title2',
                recurring: 5,
                whatever: 'whatever3'
            }];

            browserLocalStorage.setArray('key1', anArray);
            expect(browserLocalStorage.getArray('key1')).toEqual(anArray);

        });

    });

    it('should return empty array if nothing previously set.', () => {

        expect(browserLocalStorage.getArray('no-such-key')).toEqual([]);

    });

});

function fixtureSetup($window) {
    browserLocalStorage = browserLocalStorageFactory($window);
}
