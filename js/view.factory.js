let repository,
    dateUtility,
    selectedDate,
    subscribers;

viewFactory.$inject = ['repository', 'dateUtility', 'notification'];
function viewFactory(repositoryFactory, dateUtilityFactory, notification) {
    repository = repositoryFactory;
    dateUtility = dateUtilityFactory;

    // just short-circuit these notifications
    subscribers = notification.create('todoViewFactory.viewChanged');
    repository.subscribe(subscribers.notify);

    selectedDate = dateUtility.now();

    return {
        showDate: showDate,
        today: today,
        isToday: isToday,
        goTo: goTo,
        nextDay: nextDay,
        previousDay: previousDay,
        getTodo: getTodo,
        subscribe: subscribers.subscribe
    };
}

function showDate() {
    return dateUtility
        .display(selectedDate);
}

function today() {
    return selectedDate;
}

function isToday() {
    return dateUtility.compareDatePart(selectedDate, dateUtility.now()) === 0;
}

function goTo(date) {
    selectedDate = date;
    subscribers.notify();
}

function nextDay() {
    selectedDate = dateUtility.addDays(1, selectedDate);
    subscribers.notify();
}

function previousDay() {
    selectedDate = dateUtility.addDays(-1, selectedDate);
    subscribers.notify();
}

function getTodo() {
    return repository
        .getTodo()
        .filter(t => dateUtility.compareDatePart(t.nextOccurrance, selectedDate) < 1);
}

export { viewFactory };
