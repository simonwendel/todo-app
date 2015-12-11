import 'JamieMason/Jasmine-Matchers';
import { viewFactory } from 'js/view.factory';

const rms = 'March 16, 1953';

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

            let date = view.showDate();
            expect(dateUtilityMock.now.called).toBe(true);
            expect(dateUtilityMock.display.called).toBe(true);
            expect(date).toBe(rms);

        });

        it('should have a function to get the view date as a date.', () => {

            let date = view.today();
            expect(dateUtilityMock.display.called).toBe(false);
            expect(date).toBeDate();

        });

        it('should have a function to step to next day.', () => {

            view.nextDay();
            expect(dateUtilityMock.addDays.args[0][0]).toBe(1);
            expect(dateUtilityMock.addDays.args[0][1]).toBeDate();

        });

        it('should notify subscribers on step to next day.', () => {

            view.nextDay();
            expect(notificationChannel.notify.called).toBe(true);

        });

        it('should have a function to step to previous day.', () => {

            view.previousDay();
            expect(dateUtilityMock.addDays.args[0][0]).toBe(-1);
            expect(dateUtilityMock.addDays.args[0][1]).toBeDate();

        });

        it('should notify subscribers on step to previous day.', () => {

            view.previousDay();
            expect(notificationChannel.notify.called).toBe(true);

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

        it('should subscribe to the repository notification channel.', () => {

            expect(repositoryMock.subscribe.called).toBe(true);

        });

        it('should notify it´s own subscribers on repository notifications.', () => {

            expect(
                repositoryMock.subscribe.calledWith(notificationChannel.notify))
                .toBe(true);

        });

        it('should have a function to set the date.', () => {

            let woz = new Date(1950, 8, 11);
            view.goTo(woz);
            expect(view.today()).toBe(woz);

        });

        it('should notify subscribers when the date is set.', () => {

            let woz = new Date(1950, 8, 11);
            view.goTo(woz);
            expect(notificationChannel.notify.called).toBe(true);

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
        getTodo: sinon.stub().returns(todo),
        subscribe: sinon.stub()
    };

    notificationChannel = {
        subscribe: sinon.stub(),
        notify: sinon.stub()
    };

    notificationMock = {
        create: sinon.stub().returns(notificationChannel)
    };

    view = viewFactory(repositoryMock, dateUtilityMock, notificationMock);
}
