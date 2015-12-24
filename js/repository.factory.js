import { Todo } from 'js/types';

let storage,
    notification;

repositoryFactory.$inject = ['storage', 'notification'];
function repositoryFactory(storageFactory, notificationFactory) {
    storage = storageFactory;
    notification = notificationFactory.create('todoRepositoryFactory.update');

    return {
        getTodo: getTodo,
        newTodo: newTodo,
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

function newTodo(item) {
    if (!item) {
        throw new Error('No todo item object to save.');
    }

    let todo = new Todo(item);
    todo.id = getNextId();
    storage.save(todo);
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
