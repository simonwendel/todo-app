let moment;

dateUtilityFactory.$inject = ['moment'];
function dateUtilityFactory(momentFactory) {
    moment = momentFactory;

    return {
        now: () => moment().toDate(),
        display: display,
        addDays: addDays,
        compareDatePart: compareDatePart
    };
}

function addDays(days, date) {
    return moment(date)
        .add(days, 'days')
        .toDate();
}

function display(date) {
    return moment(date).format('L');
}

function compareDatePart(first, second) {
    if (moment(first).isBefore(second, 'day')) {
        return -1;
    }

    if (moment(first).isSame(second, 'day')) {
        return 0;
    }

    if (moment(first).isAfter(second, 'day')) {
        return 1;
    }
}

export { dateUtilityFactory };
