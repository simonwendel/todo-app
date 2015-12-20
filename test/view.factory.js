import 'JamieMason/Jasmine-Matchers';
import { Todo } from 'js/types';
import { dateUtilityFactory } from 'js/dateUtility.factory';
import { momentFactory } from 'js/moment.factory';
import { viewFactory } from 'js/view.factory';

const rms = 'March 16, 1953',
    today = new Date();

let view,
    todo,
    dateUtility,
    repositoryMock,
    notificationMock,
    notificationChannel;

describe('Factory: viewFactory (view.factory.js)', () => {

    beforeEach(fixtureSetup);

    describe('Product: view', () => {

        it('should exist.', () => {

            expect(view).toBeDefined();

        });

        it('should set the selected date to current date on construction.', () => {

            expect(dateUtility.now.called).toBe(true);

        });

        it('should have a function to get the view date as a string.', () => {

            let date = view.showDate();
            expect(dateUtility.display.called).toBe(true);
            expect(date).toBe(rms);

        });

        it('should have a function to get the view date as a date.', () => {

            let date = view.today();
            expect(dateUtility.display.called).toBe(false);
            expect(date).toBeDate();

        });

        it('should have a function to step to next day.', () => {

            view.nextDay();
            expect(dateUtility.addDays.args[0][0]).toBe(1);
            expect(dateUtility.addDays.args[0][1]).toBeDate();

        });

        it('should notify subscribers on step to next day.', () => {

            view.nextDay();
            expect(notificationChannel.notify.called).toBe(true);

        });

        it('should have a function to step to previous day.', () => {

            view.previousDay();
            expect(dateUtility.addDays.args[0][0]).toBe(-1);
            expect(dateUtility.addDays.args[0][1]).toBeDate();

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

        it('should have an isToday fn.', () => {

            let isToday = view.isToday();
            expect(isToday).toBe(true);
            expect(dateUtility.now.called).toBe(true);
            expect(dateUtility.compareDatePart.called).toBe(true);

        });

    });

});

function fixtureSetup() {
    todo = [
        new Todo({
            id: 1,
            nextOccurrance: new Date('2015-12-22T00:00:00+01:00')
        }), new Todo({
            id: 10,
            nextOccurrance: new Date('2015-12-22T00:00:00+01:00')
        }), new Todo({
            id: 11,
            nextOccurrance: new Date('2015-12-22T00:00:00+01:00')
        }), new Todo({
            id: 21,
            nextOccurrance: new Date('2015-12-22T00:00:00+01:00')
        })
    ];

    dateUtility = dateUtilityFactory(momentFactory());

    sinon.stub(dateUtility, 'now').returns(today);
    sinon.stub(dateUtility, 'display').returns(rms);
    sinon.stub(dateUtility, 'compareDatePart').returns(0);

    sinon.spy(dateUtility, 'addDays');

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

    view = viewFactory(repositoryMock, dateUtility, notificationMock);
}
