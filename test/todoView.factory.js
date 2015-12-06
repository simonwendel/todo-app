import 'JamieMason/Jasmine-Matchers';
import { todoViewFactory } from 'js/todoView.factory';

const rms = '1953-03-16';

let todoView,
    todo,
    dateUtilityMock,
    todoRepositoryMock;

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

        it('should have a function to step to next day.', () => {

            todoView.nextDay();
            expect(dateUtilityMock.addDays.args[0][0]).toBe(1);
            expect(dateUtilityMock.addDays.args[0][1]).toBeDate();

        });

        it('should have a function to step to previous day.', () => {

            todoView.previousDay();
            expect(dateUtilityMock.addDays.args[0][0]).toBe(-1);
            expect(dateUtilityMock.addDays.args[0][1]).toBeDate();

        });

        it('should have a function to get todo.', () => {

            let t = todoView.getTodo();
            expect(t).toBe(todo);
            expect(todoRepositoryMock.getTodo.calledOnce).toBe(true);

        });

    });

});

function fixtureSetup() {
    todo = new Array(5);

    dateUtilityMock = {
        now: sinon.stub().returns(new Date()),
        addDays: sinon.stub(),
        display: sinon.stub().returns(rms)
    };

    todoRepositoryMock = {
        getTodo: sinon.stub().returns(todo)
    };

    todoView = todoViewFactory(todoRepositoryMock, dateUtilityMock);
}
