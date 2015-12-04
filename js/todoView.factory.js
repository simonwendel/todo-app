let dateUtility,
    selectedDate;

todoViewFactory.$inject = ['dateUtility'];
function todoViewFactory(dateUtilityFactory) {
    dateUtility = dateUtilityFactory;
    selectedDate = now();

    return {
        getDate: getDate
    };
}

function now() {
    return dateUtility.now();
}

function getDate() {
    return dateUtility
        .display(selectedDate);
}

export { todoViewFactory };
