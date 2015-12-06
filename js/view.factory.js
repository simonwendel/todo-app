let repository,
    dateUtility,
    selectedDate;

viewFactory.$inject = ['repository', 'dateUtility'];
function viewFactory(repositoryFactory, dateUtilityFactory) {
    repository = repositoryFactory;
    dateUtility = dateUtilityFactory;

    selectedDate = dateUtility.now();

    return {
        getDate: getDate,
        nextDay: nextDay,
        previousDay: previousDay,
        getTodo: getTodo
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
