import * as Validate from 'validate-arguments';
import { Todo, Color } from 'js/types';

let storage,
    notification;

repositoryFactory.$inject = ['storage', 'notification'];
function repositoryFactory(storageFactory, notificationFactory) {
    storage = storageFactory;
    notification = notificationFactory.create('todoRepositoryFactory.update');

    return {
        getTodo: getTodo,
        newTodo: newTodo,
        removeTodo: removeTodo,
        subscribe: notification.subscribe
    };
}

function getTodo(id) {
    if (!id) {
        return storage.all();
    }

    let todo = storage
        .all()
        .find(t => t.id === id);

    if (todo) {
        return todo;
    }

    throw new Error('No such item found.');
}

const argsSpec = {
    title: {
        isa: 'string'
    },
    description: {
        isa: 'string',
        optional: true
    },
    created: {
        isa: 'date'
    },
    recurring: {
        isa: 'whole'
    },
    color: {
        isa: Color
    }
};

function newTodo(item) {
    if (!item) {
        throw new Error('No todo item object to save.');
    }

    let args = Validate.named(item, argsSpec);
    if (!args.isValid()) {
        throw args.errorString();
    }

    if (item.recurring < 0) {
        throw new Error('Recurring property must be non-negative whole number.');
    }

    let todo = new Todo(item);
    todo.id = getNextId();
    storage.save(todo);
    notification.notify();
}

function removeTodo(id) {
    let args = Validate.positional(arguments, ['whole']);
    if (!args.isValid()) {
        throw args.errorString();
    }

    storage.remove(id);
    notification.notify();
}

function getNextId() {
    return 1 + Math.max.apply(
        Math,
        storage
            .all()
            .map(t => t.id)
        );
}

export { repositoryFactory };
