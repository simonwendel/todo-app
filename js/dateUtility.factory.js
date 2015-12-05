dateUtilityFactory.$inject = ['moment'];
function dateUtilityFactory(momentFactory) {
    return {
        now: () => momentFactory().toDate(),
        display: date => momentFactory(date).format('L'),
        addDays: addDays
    };
}

function addDays(days, date) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export { dateUtilityFactory };
