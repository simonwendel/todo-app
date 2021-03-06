import 'JamieMason/Jasmine-Matchers';
import { translations } from 'js/config/translations';

let $translateProviderMock;

describe('Configuration: translations (config/translations.js)', () => {

    beforeEach(fixtureSetup);

    it('should set a sanitization strategy.', () => {

        translations($translateProviderMock);
        expect($translateProviderMock.useSanitizeValueStrategy.calledWith('sanitize')).toBe(true);

    });

    it('should have a hardcoded default preferredLanguage if no prefs.', () => {

        translations($translateProviderMock);
        expect($translateProviderMock.useSanitizeValueStrategy.calledWith('en')).toBe(true);

    });

    it('should use prefs object for default preferredLanguage.', () => {

        translations($translateProviderMock, { preferredLanguage: 'bleh' });
        expect($translateProviderMock.useSanitizeValueStrategy.calledWith('bleh')).toBe(true);

    });

});

function fixtureSetup() {
    $translateProviderMock = {
        useSanitizeValueStrategy: sinon.stub(),
        translations: sinon.stub(),
        preferredLanguage: sinon.stub()
    };
}
