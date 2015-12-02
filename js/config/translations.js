import { english } from 'i18n/english';
import { swedish } from 'i18n/swedish';

translationSetup.$inject = ['$translateProvider'];
function translationSetup($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.translations('en', english);
    $translateProvider.translations('sv', swedish);
    $translateProvider.preferredLanguage('en');
}

export { translationSetup };
