import 'JamieMason/Jasmine-Matchers';
import { localeFactory } from 'js/locale.factory';

const locale = localeFactory();

describe('Factory: localeFactory (locale.factory.js)', () => {

    describe('Product: locale', () => {

        it('should have a hardcoded default locale string.', () => {

            expect(locale.default).toBe('sv');

        });

    });

});
