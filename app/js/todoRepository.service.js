;(function () {
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
        },{
            id: 10,
            title: 'Something to do 2',
            description: 'This is a longer description string to show in details',
            created: '2015-11-05T14:09:39+01:00',
            recurring: 5,
            completed: [
                '2015-11-05T14:09:39+01:00',
                '2015-11-05T14:09:39+01:00'
            ],
            color: 'crimson'
        },{
            id: 11,
            title: 'Something to do 3',
            description: 'This is a longer description string to show in details',
            created: '2015-11-05T14:09:39+01:00',
            recurring: 5,
            completed: [
                '2015-11-05T14:09:39+01:00',
                '2015-11-05T14:09:39+01:00'
            ],
            color: 'crimson'
        },{
            id: 21,
            title: 'Something to do 4',
            description: 'This is a longer description string to show in details',
            created: '2015-11-05T14:09:39+01:00',
            recurring: 5,
            completed: [
                '2015-11-05T14:09:39+01:00',
                '2015-11-05T14:09:39+01:00'
            ],
            color: 'crimson'
        }
    ];

    angular
        .module('todo')
        .factory('todoRepository', todoRepository);

    /** @ngInject */
    function todoRepository() {
        return {
            getTodo: getTodo
        };
    }

    function getTodo(id) {
        if(id) {
            var todos =
                dummyTodos.filter(function filterDummyTodos(element) {
                    return id === element.id;
                });

            if(todos.length !== 1) {
                throw 'No such item found.';
            }

            return todos[0];
        }

        return dummyTodos;
    }
})();
