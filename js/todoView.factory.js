let todoRepository,
    dateUtility,
    selectedDate;

todoViewFactory.$inject = ['todoRepository', 'dateUtility'];
function todoViewFactory(todoRepositoryFactory, dateUtilityFactory) {
    todoRepository = todoRepositoryFactory;
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
    return todoRepository.getTodo();
}

export { todoViewFactory };
