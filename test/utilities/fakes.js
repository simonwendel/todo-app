let expected;

function promise(expectedResult) {
    expected = expectedResult;

    return {
        resolved: fakeResolved
    };
}

function fakeResolved() {
    return {
        then: function(callback) {
            callback(expected);
        }
    };
}

export { promise };
