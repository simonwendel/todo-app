dateUtilityFactory.$inject = ['moment'];
function dateUtilityFactory(momentProvider) {
    return {
        now: () => momentProvider().toDate(),
        addDays: addDays
    };
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export { dateUtilityFactory };
