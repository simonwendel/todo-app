
import Validate from 'validate-arguments';

class Color {
    constructor(name, value) {
        var args =
            Validate.positional(arguments, ['string', 'string']);

        if (!args.isValid()) {
            throw args.errorString();
        }


        this.name = name;
        this.value = value;
    }
}

export { Color };
