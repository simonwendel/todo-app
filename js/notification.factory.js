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
        subscribe: (scope, callback) => {
            let handler = rootScope.$on(eventName, callback);
            scope.$on('$destroy', handler);
        },
        notify: () => {
            rootScope.$emit(eventName);
        }
    };
}

export { notificationFactory };
