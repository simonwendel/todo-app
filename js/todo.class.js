
import Validate from 'validate-arguments';
import { Color } from 'js/color.class';

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
    nextOccurrance: {
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
        var args = Validate.named(data, argsSpec);
        if (!args.isValid()) {
            throw args.errorString();
        }

        this.id = data.id ? data.id : null;
        this.title = data.title ? data.title : null;
        this.description = data.description ? data.description : null;
        this.created = data.created ? data.created : new Date();
        this.recurring = data.recurring ? data.recurring : null;
        this.nextOccurrance = data.nextOccurrance ? data.nextOccurrance : this.created;
        this.color = data.color ? data.color : null;
    }
}

export { Todo };
