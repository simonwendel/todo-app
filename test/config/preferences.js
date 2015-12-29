import 'JamieMason/Jasmine-Matchers';
import { preferences } from 'js/config/preferences';

describe('Configuration: preferences (config/preferences.js)', () => {

    it('should have preset prefs.', () => {

        expect(preferences).toEqual({
            defaultLocale: 'sv',
            preferredLanguage: 'en'
        });

    });

});
