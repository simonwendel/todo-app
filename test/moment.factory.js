import 'JamieMason/Jasmine-Matchers';
import { momentFactory } from 'js/moment.factory';

let moment,
    localeMock;

describe('Factory: momentFactory (moment.factory.js)', () => {

    it('should not throw if localeFactory is undefined.', () => {

        expect(() => momentFactory()).not.toThrow();

    });

    describe('Product: moment', () => {

        beforeEach(fixtureSetup);

        it('should honor the default locale.', () => {

            expect(moment.locale()).toBe(localeMock.default);
            expect(moment().locale()).toBe(localeMock.default);

        });

    });

});

function fixtureSetup() {
    localeMock = {
        default: 'en'
    };

    moment = momentFactory(localeMock);
}
