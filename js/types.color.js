import Validate from 'validate-arguments';

class Color {
    constructor(colorName, colorValue) {
        let args =
            Validate.positional(arguments, ['string', 'string']);

        if (!args.isValid()) {
            throw args.errorString();
        }


        this.colorName = colorName;
        this.colorValue = colorValue;
    }
}

export { Color };
