browserLocalStorageFactory.$inject = ['$window'];
function browserLocalStorageFactory($window) {
    return {
        setArray: (key, array) => {
            $window.localStorage[key] = JSON.stringify(array);
        },
        getArray: (key) => {
            return JSON.parse($window.localStorage[key] || '[]');
        }
    };
}

export { browserLocalStorageFactory };
