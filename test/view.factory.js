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

            let date = view.viewingDate();
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
            expect(view.viewingDate()).toBe(woz);

        });

        it('should notify subscribers when the date is set.', () => {

            let woz = new Date(1950, 8, 11);
            view.goTo(woz);
            expect(notificationChannel.notify.called).toBe(true);

        });

        it('should have an isToday fn.', () => {

            // on construction, we are already at today
            let isToday = view.isToday();
            expect(isToday).toBe(true);
            expect(dateUtility.now.called).toBe(true);
            expect(dateUtility.compareDatePart.called).toBe(true);

        });

        // kind of integrating with date util
        describe('Function: getTodo', () => {

            it('should have a filtered list of items to do today.', () => {

                let list = view.getTodo();
                expect(list).toBeArrayOfSize(3); // <- the one elapsing in 4 days excluded

            });

            it('should only show items on that day, if viewing the future.', () => {

                view.goTo(dateUtility.addDays(4, today));
                let list = view.getTodo();
                expect(list).toBeArrayOfSize(1);

            });

            it('should not show any items on that day, if none on that day.', () => {

                view.goTo(dateUtility.addDays(3, today));
                let list = view.getTodo();
                expect(list).toBeArrayOfSize(0);

            });

            it('should add property to todo items stating if item is late or not.', () => {

                let late = view.getTodo().filter(t => t.overdue === true);
                let onTime = view.getTodo().filter(t => t.overdue === false);
                expect(late).toBeArrayOfSize(2);
                expect(onTime).toBeArrayOfSize(1);

            });

        });

    });

});

function fixtureSetup() {
    dateUtility = dateUtilityFactory(momentFactory());

    todo = [
        new Todo({
            id: 1,
            nextOccurrance: dateUtility.addDays(4, today) // not yet relevant
        }), new Todo({
            id: 10,
            nextOccurrance: new Date(today) // should be done
        }), new Todo({
            id: 11,
            nextOccurrance: dateUtility.addDays(-4, today) // late
        }), new Todo({
            id: 21,
            nextOccurrance: dateUtility.addDays(-1, today) // late
        })
    ];

    sinon.stub(dateUtility, 'now').returns(today);
    sinon.stub(dateUtility, 'display').returns(rms);

    sinon.spy(dateUtility, 'addDays');
    sinon.spy(dateUtility, 'compareDatePart');

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
