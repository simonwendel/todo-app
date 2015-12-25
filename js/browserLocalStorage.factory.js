browserLocalStorageFactory.$inject = ['$window'];
function browserLocalStorageFactory($window) {
    return {
        setObject: (key, value) => {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: (key) => {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    };
}

export { browserLocalStorageFactory };
