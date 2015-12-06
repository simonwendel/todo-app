let storage,
    notificationService;

todoRepositoryFactory.$inject = ['storage', 'notificationService'];
function todoRepositoryFactory(storageFactory, notificationServiceFactory) {
    storage = storageFactory;
    notificationService = notificationServiceFactory.build('todoRepositoryFactory.update');

    return {
        getTodo: getTodo,
        newTodo: newTodo,
        subscribe: notificationService.subscribe
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
        notificationService.notify();
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
