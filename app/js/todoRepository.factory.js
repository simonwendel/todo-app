;(function() {
    'use strict';

    angular
        .module('todo')
        .factory('todoRepository', todoRepository);

    /** @ngInject */
    function todoRepository(todoStorage, notificationService) {
        storage = todoStorage;
        notification = notificationService.build('todoRepository.update');

        return {
            getTodo: getTodo,
            newTodo: newTodo,
            subscribe: notification.subscribe
        };
    }

    var storage,
        notification;

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
            notification.notify();
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
})();
