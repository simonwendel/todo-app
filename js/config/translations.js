import { english } from 'i18n/english';
import { swedish } from 'i18n/swedish';

translations.$inject = ['$translateProvider', 'preferences'];
function translations($translateProvider, preferences) {
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.translations('en', english);
    $translateProvider.translations('sv', swedish);

    if (preferences) {
        $translateProvider.preferredLanguage(preferences.preferredLanguage);
    } else {
        $translateProvider.preferredLanguage('en');
    }
}

export { translations };
