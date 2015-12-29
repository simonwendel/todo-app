localeFactory.$inject = ['preferences'];
function localeFactory(preferences) {
    return {
        default: preferences ? preferences.defaultLocale : 'sv'
    };
}

export { localeFactory };
