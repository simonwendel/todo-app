import Validate from 'validate-arguments';
import { Todo } from 'js/types';
import { staticTodos } from 'js/config/staticTodos';

let todos;

function storageFactory() {
    todos = staticTodos.slice();

    return {
        all: all,
        save: save,
        remove: remove
    };
}

function all() {
    return todos.slice();
}

function save(item) {
    var args =
        Validate.positional(arguments, [Todo]);

    if (!args.isValid()) {
        throw args.errorString();
    }

    todos.push(item);
}

function remove(id) {
    let index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        throw new Error('No todo item with supplied id found.');
    }

    todos.splice(index, 1);
}

export { storageFactory };
