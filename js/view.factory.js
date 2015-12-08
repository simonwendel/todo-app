let repository,
    dateUtility,
    selectedDate,
    subscribers;

viewFactory.$inject = ['repository', 'dateUtility', 'notification'];
function viewFactory(repositoryFactory, dateUtilityFactory, notification) {
    repository = repositoryFactory;
    dateUtility = dateUtilityFactory;
    subscribers = notification.create('todoViewFactory.viewChanged');

    selectedDate = dateUtility.now();

    return {
        getDate: getDate,
        nextDay: nextDay,
        previousDay: previousDay,
        getTodo: getTodo,
        subscribe: subscribers.subscribe
    };
}

function getDate() {
    return dateUtility
        .display(selectedDate);
}

function nextDay() {
    selectedDate = dateUtility.addDays(1, selectedDate);
}

function previousDay() {
    selectedDate = dateUtility.addDays(-1, selectedDate);
}

function getTodo() {
    return repository.getTodo();
}

export { viewFactory };
