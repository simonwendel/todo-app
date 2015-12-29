import 'JamieMason/Jasmine-Matchers';
import { localeFactory } from 'js/locale.factory';

describe('Factory: localeFactory (locale.factory.js)', () => {

    describe('Product: locale', () => {

        it('should have a hardcoded default locale string if no prefs.', () => {

            const locale = localeFactory();
            expect(locale.default).toBe('sv');

        });

        it('should use prefs object for default locale string.', () => {

            const locale = localeFactory({defaultLocale: 'bleh'});
            expect(locale.default).toBe('bleh');

        });

    });

});
