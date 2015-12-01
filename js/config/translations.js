import { english } from 'i18n/english';

function translationSetup($translateProvider) {
    $translateProvider.translations('en', english);
    $translateProvider.preferredLanguage('en');
}

export { translationSetup };
