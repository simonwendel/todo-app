import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';
import { notificationService } from 'js/notificationService.factory';

let notification,
    rootScope;

describe('Factory: notificationService (notificationService.factory.js)', () => {

    beforeEach(ng.inject(fixtureSetup));

    it('should have a build function.', () => {

        expect(notification.build('some event')).toBeDefined();

    });

    it('should return a notification service from build which consumers can subscribe to.', () => {

        let someFunction = sinon.spy(),
            scope = rootScope.$new(),
            service = notification.build('some event');

        service.subscribe(scope, someFunction);

    });

    it('should call subscriber back on notify.', () => {

        let someFunction = sinon.spy(),
            scope = rootScope.$new(),
            service = notification.build('some event');

        service.subscribe(scope, someFunction);
        service.notify();
        expect(someFunction.called).toBeTruthy();

    });

    it('should clean up on scope.$destroy.', () => {

        let someFunction = sinon.spy(),
            scope = rootScope.$new(),
            service = notification.build('some event');

        service.subscribe(scope, someFunction);
        scope.$destroy();
        service.notify();
        expect(someFunction.called).toBeFalsy();

    });

});

function fixtureSetup($rootScope) {
    rootScope = $rootScope;
    notification = notificationService(rootScope);
}

