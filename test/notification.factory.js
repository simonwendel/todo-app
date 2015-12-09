import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';
import { notificationFactory } from 'js/notification.factory';

let notification,
    rootScope;

describe('Factory: notificationFactory (notification.factory.js)', () => {

    beforeEach(ng.inject(fixtureSetup));

    describe('Product: notification', () => {

        it('should have a create function.', () => {

            expect(notification.create('some event')).toBeDefined();

        });

        it('should return a notification service from create which consumers can subscribe to.', () => {

            let someFunction = sinon.spy(),
                scope = rootScope.$new(),
                service = notification.create('some event');

            service.subscribe(someFunction, scope);

        });

        it('should call subscriber back on notify.', () => {

            let someFunction = sinon.spy(),
                scope = rootScope.$new(),
                service = notification.create('some event');

            service.subscribe(someFunction, scope);
            service.notify();
            expect(someFunction.called).toBe(true);

        });

        it('should clean up on scope.$destroy.', () => {

            let someFunction = sinon.spy(),
                scope = rootScope.$new(),
                service = notification.create('some event');

            service.subscribe(someFunction, scope);
            scope.$destroy();
            service.notify();
            expect(someFunction.called).toBe(false);

        });

    });

});

function fixtureSetup($rootScope) {
    rootScope = $rootScope;
    notification = notificationFactory(rootScope);
}
