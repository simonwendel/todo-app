import 'JamieMason/Jasmine-Matchers';
import { viewFactory } from 'js/view.factory';

const rms = '1953-03-16';

let view,
    todo,
    dateUtilityMock,
    repositoryMock,
    notificationMock,
    notificationChannel;

describe('Factory: viewFactory (view.factory.js)', () => {

    beforeEach(fixtureSetup);

    describe('Product: view', () => {

        it('should exist.', () => {

            expect(view).toBeDefined();

        });

        it('should have a function to get the view date as a string.', () => {

            let date = view.getDate();
            expect(dateUtilityMock.now.called).toBe(true);
            expect(dateUtilityMock.display.called).toBe(true);
            expect(date).toBe(rms);

        });

        it('should have a function to step to next day.', () => {

            view.nextDay();
            expect(dateUtilityMock.addDays.args[0][0]).toBe(1);
            expect(dateUtilityMock.addDays.args[0][1]).toBeDate();

        });

        it('should have a function to step to previous day.', () => {

            view.previousDay();
            expect(dateUtilityMock.addDays.args[0][0]).toBe(-1);
            expect(dateUtilityMock.addDays.args[0][1]).toBeDate();

        });

        it('should have a function to get todo.', () => {

            let t = view.getTodo();
            expect(t).toBe(todo);
            expect(repositoryMock.getTodo.calledOnce).toBe(true);

        });

        it('should set up a notification channel', () => {

            expect(view.subscribe).toBe(notificationChannel.subscribe);
            expect(
                notificationMock.create.calledWith('todoViewFactory.viewChanged'))
                .toBe(true);

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

    repositoryMock = {
        getTodo: sinon.stub().returns(todo)
    };

    notificationChannel = {
        subscribe: sinon.stub()
    };

    notificationMock = {
        create: sinon.stub().returns(notificationChannel),
    };

    view = viewFactory(repositoryMock, dateUtilityMock, notificationMock);
}
