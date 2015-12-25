import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';
import { browserLocalStorageFactory } from 'js/browserLocalStorage.factory';

let browserLocalStorage;

describe('Factory: browserLocalStorageFactory (browserLocalStorage.factory.js)', () => {

    beforeEach(ng.inject(fixtureSetup));

    describe('Product: browserLocalStorage', () => {

        it('should be able set and get some object to and from local storage.', () => {

            let someObject = {
                id: 4,
                title: 'title',
                recurring: 5,
                whatever: 'whatever'
            };

            browserLocalStorage.setObject('key1', someObject);
            expect(browserLocalStorage.getObject('key1')).toEqual(someObject);

        });

    });

});

function fixtureSetup($window) {
    browserLocalStorage = browserLocalStorageFactory($window);
}
