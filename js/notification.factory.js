let rootScope;

notificationFactory.$inject = ['$rootScope'];
function notificationFactory($rootScope) {
    rootScope = $rootScope;

    return {
        create: create
    };
}

function create(eventName) {
    return {
        subscribe: (callback, scope) => {
            let handler = rootScope.$on(eventName, callback);
            if (scope) {
                scope.$on('$destroy', handler);
            }
        },
        notify: () => {
            rootScope.$emit(eventName);
        }
    };
}

export { notificationFactory };
