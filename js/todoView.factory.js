let dateUtilityService,
    selectedDate;

todoViewFactory.$inject = ['dateUtility'];
function todoViewFactory(dateUtility) {
    dateUtilityService = dateUtility;
    selectedDate = now();

    return {
        getDate: getDate
    };
}

function now() {
    return dateUtilityService.now();
}

function getDate() {
    return dateUtilityService
        .display(selectedDate);
}

export { todoViewFactory };
