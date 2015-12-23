import { Color } from 'js/types';

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
        getAll: getAll,
        getByValue: getByValue
    };
}

function getAll() {
    if (translate) {
        return colors.map(
            c => new Color(translate.instant(c.colorName), c.colorValue));
    }

    return colors.slice();
}

function getByValue(value) {
    var found = colors.find(c => c.colorValue === value);
    if (found) {
        return new Color(translate.instant(found.colorName), found.colorValue);
    }

    throw new Error('No such color!');
}

export { colorsFactory };
