let storage,
    subscribers;

function todoRepositoryFactory(todoStorage, notificationService) {
    storage = todoStorage;
    subscribers = notificationService.build('todoRepositoryFactory.update');

    return {
        getTodo: getTodo,
        newTodo: newTodo,
        subscribe: subscribers.subscribe
    };
}

function getTodo(id) {
    if (id) {
        let todo = storage
            .all()
            .filter(t => id === t.id);

        if (todo.length !== 1) {
            throw new Error('No such item found.');
        }

        return todo[0];
    }

    return storage.all();
}

function newTodo(item) {
    if (item) {
        item.id = getNextId();
        storage.save(item);
        subscribers.notify();
    } else {
        throw new Error('No todo item object to save.');
    }
}

function getNextId() {
    return 1 + Math.max.apply(
            Math,
            storage
                .all()
                .map(t => t.id)
        );
}

export { todoRepositoryFactory };
