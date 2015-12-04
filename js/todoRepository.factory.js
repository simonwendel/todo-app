let todoStorage,
    notificationService;

todoRepositoryFactory.$inject = ['todoStorage', 'notificationService'];
function todoRepositoryFactory(todoStorageFactory, notificationServiceFactory) {
    todoStorage = todoStorageFactory;
    notificationService = notificationServiceFactory.build('todoRepositoryFactory.update');

    return {
        getTodo: getTodo,
        newTodo: newTodo,
        subscribe: notificationService.subscribe
    };
}

function getTodo(id) {
    if (id) {
        let todo = todoStorage
            .all()
            .filter(t => id === t.id);

        if (todo.length !== 1) {
            throw new Error('No such item found.');
        }

        return todo[0];
    }

    return todoStorage.all();
}

function newTodo(item) {
    if (item) {
        item.id = getNextId();
        todoStorage.save(item);
        notificationService.notify();
    } else {
        throw new Error('No todo item object to save.');
    }
}

function getNextId() {
    return 1 + Math.max.apply(
            Math,
            todoStorage
                .all()
                .map(t => t.id)
        );
}

export { todoRepositoryFactory };
