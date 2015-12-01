const colors = [
    {colorName: 'CRIMSON__PASCAL', colorValue: 'crimson'},
    {colorName: 'DARKBLUE__PASCAL', colorValue: 'darkblue'},
    {colorName: 'PURPLE__PASCAL', colorValue: 'purple'},
    {colorName: 'SEAGREEN__PASCAL', colorValue: 'seagreen'},
    {colorName: 'TOMATO__PASCAL', colorValue: 'tomato'},
    {colorName: 'VIOLET__PASCAL', colorValue: 'violet'}
];

let translate;

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
                colorName: translate(c.colorName),
                colorValue: c.colorValue
            }
        });
}

export { colorsFactory };
