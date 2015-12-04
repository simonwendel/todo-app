dateUtilityFactory.$inject = ['moment'];
function dateUtilityFactory(momentFactory) {
    return {
        now: () => momentFactory().toDate(),
        addDays: addDays
    };
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export { dateUtilityFactory };
