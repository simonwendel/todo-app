import Validate from 'validate-arguments';
import { Todo, Color } from 'js/types';

let storageKey,
    todos,
    browserLocalStorage;

storageFactory.$inject = ['browserLocalStorage', 'preferences'];
function storageFactory(browserLocalStorageFactory, preferences) {
    storageKey = preferences.storageKey;
    browserLocalStorage = browserLocalStorageFactory;
    todos = retrieveItems();

    return {
        all: all,
        save: save,
        remove: remove,
        update: update
    };
}

function all() {
    return todos.slice();
}

function save(item) {
    let args =
        Validate.positional(arguments, [Todo]);

    if (!args.isValid()) {
        throw args.errorString();
    }

    todos.push(item);
    persistItems();
}

function remove(id) {
    let index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        throw new Error('No todo item with supplied id found.');
    }

    todos.splice(index, 1);
    persistItems();
}

function update(item) {
    let args =
        Validate.positional(arguments, [Todo]);

    if (!args.isValid()) {
        throw args.errorString();
    }

    remove(item.id);
    save(item);
}

function retrieveItems() {
    return browserLocalStorage.getArray(storageKey).map(
        t => new Todo({
            id: t.id,
            title: t.title,
            description: t.description,
            created: new Date(t.created),
            nextOccurrence: new Date(t.nextOccurrence),
            color: new Color(
                t.color.colorName,
                t.color.colorValue
            ),
            recurring: t.recurring
        }));
}

function persistItems() {
    browserLocalStorage.setArray(storageKey, todos);
}

export { storageFactory };
