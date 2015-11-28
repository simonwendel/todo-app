const dateUtilityFactory = () => {
    return {
        addDays: addDays
    };
};

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export { dateUtilityFactory };
