const colors = [
    {colorName: 'CRIMSON__COLOR', colorValue: 'crimson'},
    {colorName: 'DARKBLUE__COLOR', colorValue: 'darkblue'},
    {colorName: 'PURPLE__COLOR', colorValue: 'purple'},
    {colorName: 'SEAGREEN__COLOR', colorValue: 'seagreen'},
    {colorName: 'TOMATO__COLOR', colorValue: 'tomato'},
    {colorName: 'VIOLET__COLOR', colorValue: 'violet'}
];

let translate;

colorsFactory.$inject = ['$translate'];
function colorsFactory($translate) {
    translate = $translate;
    return {
        getAll: getAll
    };
}

function getAll() {
    return colors
        .map(c => {
            return {
                colorName: translate.instant(c.colorName),
                colorValue: c.colorValue
            };
        });
}

export { colorsFactory };
