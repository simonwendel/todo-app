import 'JamieMason/Jasmine-Matchers';
import { todoViewFactory } from 'js/todoView.factory';

const rms = '1953-03-16';

let todoView,
    dateUtilityMock;

describe('Factory: todoViewFactory (todoView.factory.js)', () => {

    beforeEach(fixtureSetup);

    describe('Product: todoView', () => {

        it('should exist.', () => {

            expect(todoView).toBeDefined();

        });

        it('should have a function to get the view date as a string.', () => {

            let date = todoView.getDate();
            expect(dateUtilityMock.now.called).toBe(true);
            expect(dateUtilityMock.display.called).toBe(true);
            expect(date).toBe(rms);

        });

    });

});

function fixtureSetup() {
    dateUtilityMock = {
        now: sinon.stub(),
        display: sinon.stub().returns(rms)
    };

    todoView = todoViewFactory(dateUtilityMock);
}
