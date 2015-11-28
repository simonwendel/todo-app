function todoRepository(todoStorage, notificationService) {
    storage = todoStorage;
    subscribers = notificationService.build('todoRepository.update');

    return {
        getTodo: getTodo,
        newTodo: newTodo,
        subscribe: subscribers.subscribe
    };
}

var storage,
    subscribers;

function getTodo(id) {
    if (id) {
        var todos =
            storage.all().filter(function filterDummyTodos(element) {
                return id === element.id;
            });

        if (todos.length !== 1) {
            throw new Error('No such item found.');
        }

        return todos[0];
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
    return 1 + Math.max.apply(Math,
            storage.all().map(function(t) {
                return t.id;
            }));
}

export { todoRepository };
