import { Color } from 'js/color.class';

const colors = [
    new Color('CRIMSON__COLOR', 'crimson'),
    new Color('DARKBLUE__COLOR', 'darkblue'),
    new Color('PURPLE__COLOR', 'purple'),
    new Color('SEAGREEN__COLOR', 'seagreen'),
    new Color('TOMATO__COLOR', 'tomato'),
    new Color('VIOLET__COLOR', 'violet')
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
    if (translate) {
        return colors.map(
            c => new Color(translate.instant(c.colorName), c.colorValue));
    }

    return colors.slice();
}

export { colorsFactory };
