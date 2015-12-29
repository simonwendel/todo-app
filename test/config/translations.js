import 'JamieMason/Jasmine-Matchers';
import { translations } from 'js/config/translations';

let $translateProviderMock;

describe('Configuration: translations (config/translations.js)', () => {

    beforeEach(fixtureSetup);

    it('should set a sanitization strategy.', () => {

        translations($translateProviderMock);
        expect($translateProviderMock.useSanitizeValueStrategy.calledWith('sanitize')).toBe(true);

    });

});

function fixtureSetup() {
    $translateProviderMock = {
        useSanitizeValueStrategy: sinon.stub(),
        translations: sinon.stub(),
        preferredLanguage: sinon.stub()
    };
}
