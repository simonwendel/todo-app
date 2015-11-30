let staticTodos = [{
    id: 1,
    title: 'Something to do 1',
    description: 'This is a longer description string to show in details',
    created: '2015-11-05T14:09:39+01:00',
    recurring: 5,
    completed: [
        '2015-11-15T14:09:39+01:00',
        '2015-11-25T14:09:39+01:00'
    ],
    color: 'crimson'
}, {
    id: 10,
    title: 'Something to do 2',
    description: 'This is a longer description string to show in details',
    created: '2015-11-21T14:09:39+01:00',
    recurring: 15,
    completed: [
    ],
    color: 'seagreen'
}, {
    id: 11,
    title: 'Something to do 3',
    description: 'This is a longer description string to show in details',
    created: '2015-11-22T14:09:39+01:00',
    recurring: 7,
    completed: [
        '2015-11-22T14:09:39+01:00',
    ],
    color: 'purple'
}, {
    id: 21,
    title: 'Something to do 4',
    description: 'This is a longer description string to show in details',
    created: '2015-11-05T14:09:39+01:00',
    recurring: 10,
    completed: [
        '2015-11-25T14:09:39+01:00'
    ],
    color: 'seagreen'
}];

function todoStorageFactory() {
    return {
        all: all,
        save: save
    };
}

function all() {
    return staticTodos.slice();
}

function save(item) {
    staticTodos.push(item);
}

export { todoStorageFactory };
