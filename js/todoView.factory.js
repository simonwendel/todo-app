let dateUtility,
    selectedDate;

todoViewFactory.$inject = ['dateUtility'];
function todoViewFactory(dateUtilityFactory) {
    dateUtility = dateUtilityFactory;
    selectedDate = now();

    return {
        getDate: getDate,
        nextDay: nextDay
    };
}

function now() {
    return dateUtility.now();
}

function getDate() {
    return dateUtility
        .display(selectedDate);
}

function nextDay() {
    selectedDate = dateUtility.addDays(1, selectedDate);
}

export { todoViewFactory };
