import Validate from 'validate-arguments';
import { Todo } from 'js/types';
import { staticTodos } from 'js/config/staticTodos';

let todos;

function storageFactory() {
    todos = staticTodos.slice();

    return {
        all: all,
        save: save
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

export { storageFactory };
