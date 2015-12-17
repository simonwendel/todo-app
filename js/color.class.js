
import Validate from 'validate-arguments';

const argsSpec = [
    'string',
    'string'
];

class Color {
    constructor(name, value) {
        var args = Validate.positional(arguments, argsSpec);
        if (!args.isValid()) {
            throw args.errorString();
        }


        this.name = name;
        this.value = value;
    }
}

export { Color };
