import Validate from 'validate-arguments';
import { Color } from 'js/types.color';

const argsSpec = {
    id: {
        isa: 'whole',
        optional: true
    },
    title: {
        isa: 'string',
        optional: true
    },
    description: {
        isa: 'string',
        optional: true
    },
    created: {
        isa: 'date',
        optional: true
    },
    recurring: {
        isa: 'whole',
        optional: true
    },
    nextOccurrence: {
        isa: 'date',
        optional: true
    },
    color: {
        isa: Color,
        optional: true
    }
};

class Todo {
    constructor(data) {
        let args = Validate.named(data, argsSpec);
        if (!args.isValid()) {
            throw args.errorString();
        }

        this.id = data.id ? data.id : null;
        this.title = data.title ? data.title : null;
        this.description = data.description ? data.description : null;
        this.created = data.created ? data.created : new Date();
        this.nextOccurrence = data.nextOccurrence ? data.nextOccurrence : this.created;
        this.color = data.color ? data.color : null;

        // if you didn't specify, then 0 it is!
        this.recurring = data.recurring << 0;
    }
}

export { Todo };
