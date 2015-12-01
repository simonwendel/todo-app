import { english } from 'i18n/english';

function translationsConfig($translateProvider) {
    $translateProvider.translations('en', english);
    $translateProvider.preferredLanguage('en');
}

export { translationsConfig };
