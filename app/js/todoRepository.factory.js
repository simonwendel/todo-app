;(function() {
    'use strict';

    var dummyTodos = [{
        id: 1,
        title: 'Something to do 1',
        description: 'This is a longer description string to show in details',
        created: '2015-11-05T14:09:39+01:00',
        recurring: 5,
        completed: [
            '2015-11-05T14:09:39+01:00',
            '2015-11-05T14:09:39+01:00'
        ],
        color: 'crimson'
    }, {
        id: 10,
        title: 'Something to do 2',
        description: 'This is a longer description string to show in details',
        created: '2015-11-05T14:09:39+01:00',
        recurring: 5,
        completed: [
            '2015-11-05T14:09:39+01:00',
            '2015-11-05T14:09:39+01:00'
        ],
        color: 'seagreen'
    }, {
        id: 11,
        title: 'Something to do 3',
        description: 'This is a longer description string to show in details',
        created: '2015-11-05T14:09:39+01:00',
        recurring: 5,
        completed: [
            '2015-11-05T14:09:39+01:00',
            '2015-11-05T14:09:39+01:00'
        ],
        color: 'purple'
    }, {
        id: 21,
        title: 'Something to do 4',
        description: 'This is a longer description string to show in details',
        created: '2015-11-05T14:09:39+01:00',
        recurring: 5,
        completed: [
            '2015-11-05T14:09:39+01:00',
            '2015-11-05T14:09:39+01:00'
        ],
        color: 'seagreen'
    }
    ];

    angular
        .module('todo')
        .factory('todoRepository', todoRepository);

    /** @ngInject */
    function todoRepository() {
        return {
            getTodo: getTodo,
            newTodo: newTodo
        };
    }

    function getTodo(id) {
        if (id) {
            var todos =
                dummyTodos.filter(function filterDummyTodos(element) {
                    return id === element.id;
                });

            if (todos.length !== 1) {
                throw new Error('No such item found.');
            }

            return todos[0];
        }

        return dummyTodos;
    }

    function newTodo(item) {
        if (item) {
            var id = getNextId();
            item.id = id;
            dummyTodos.push(item);
        } else {
            throw new Error('No todo item object to save.');
        }
    }

    function getNextId() {
        return 1 + Math.max.apply(Math,
            dummyTodos.map(function(t) {
                return t.id;
            }));
    }
})();
