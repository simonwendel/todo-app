import * as Validate from 'validate-arguments';
import { Todo, Color } from 'js/types';

let storage,
    notification,
    dateUtility;

repositoryFactory.$inject = ['storage', 'notification', 'dateUtility'];
function repositoryFactory(storageFactory, notificationFactory, dateUtilityFactory) {
    storage = storageFactory;
    notification = notificationFactory.create('todoRepositoryFactory.update');
    dateUtility = dateUtilityFactory;

    return {
        getTodo: getTodo,
        newTodo: newTodo,
        removeTodo: removeTodo,
        markTodo: markTodo,
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

function markTodo(todo) {
    let args = Validate.positional(arguments, [Todo]);
    if (!args.isValid()) {
        throw args.errorString();
    }

    if (todo.recurring === 0) {
        removeTodo(todo.id);
        return;
    }

    todo.nextOccurrance =
        dateUtility.addDays(todo.recurring, dateUtility.now());

    storage.update(todo);
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
