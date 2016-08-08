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
        viewingDate: viewingDate,
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

function viewingDate() {
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
    let todo = repository.getTodo();
    if (isToday()) {
        todo =
            todo.filter(t => dateUtility.compareDatePart(t.nextOccurrence, selectedDate) < 1);
    } else {
        todo =
            todo.filter(t => dateUtility.compareDatePart(t.nextOccurrence, selectedDate) === 0);
    }

    return todo.map(t => {
        t.overdue =
            dateUtility.compareDatePart(t.nextOccurrence, selectedDate) < 0;
        return t;
    });
}

export { viewFactory };
