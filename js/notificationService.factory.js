let rootScope;

function notificationServiceFactory($rootScope) {
    rootScope = $rootScope;

    return {
        build: build
    };
}

function build(eventName) {
    return {
        subscribe: (scope, callback) => {
            var handler = rootScope.$on(eventName, callback);
            scope.$on('$destroy', handler);
        },
        notify: () => {
            rootScope.$emit(eventName);
        }
    };
}

export { notificationServiceFactory };
