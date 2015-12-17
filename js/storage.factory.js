import { Color } from 'js/color.class';
import { Todo } from 'js/todo.class';

let staticTodos = [
    new Todo({
        id: 1,
        title: 'Something to do 1',
        description: 'This is a longer description string to show in details',
        created: new Date('2015-11-05T14:09:39+01:00'),
        recurring: 5,
        color: new Color('CRIMSON__COLOR', 'crimson'),
        nextOccurrance: new Date('2015-12-22T00:00:00+01:00')
    }), new Todo({
        id: 10,
        title: 'Something to do 2',
        description: 'This is a longer description string to show in details',
        created: new Date('2015-11-21T14:09:39+01:00'),
        recurring: 15,
        color: new Color('SEAGREEN__COLOR', 'seagreen'),
        nextOccurrance: new Date('2015-12-22T00:00:00+01:00')
    }), new Todo({
        id: 11,
        title: 'Something to do 3',
        description: 'This is a longer description string to show in details',
        created: new Date('2015-11-22T14:09:39+01:00'),
        recurring: 7,
        color: new Color('PURPLE__COLOR', 'purple'),
        nextOccurrance: new Date('2015-12-22T00:00:00+01:00')
    }), new Todo({
        id: 21,
        title: 'Something to do 4',
        description: 'This is a longer description string to show in details',
        created: new Date('2015-11-05T14:09:39+01:00'),
        recurring: 10,
        color: new Color('SEAGREEN__COLOR', 'seagreen'),
        nextOccurrance: new Date('2015-12-22T00:00:00+01:00')
    })
];

function storageFactory() {
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

export { storageFactory };
