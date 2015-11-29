import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';
import 'js/app';

let notificationService,
    rootScope;

describe('Factory: notificationService (notificationService.factory.js)', () => {

    beforeEach(ng.module('todo'));

    beforeEach(ng.inject(fixtureSetup));

    it('should be defined and accessible.', () => {

        expect(notificationService).toBeDefined();

    });

    it('should have a build function.', () => {

        expect(notificationService.build('some event')).toBeDefined();

    });

    it('should return a notification service from build which consumers can subscribe to.', () => {

        let someFunction = sinon.spy(),
            scope = rootScope.$new(),
            service = notificationService.build('some event');

        service.subscribe(scope, someFunction);
        
    });

    it('should call subscriber back on notify.', () => {

        let someFunction = sinon.spy(),
            scope = rootScope.$new(),
            service = notificationService.build('some event');

        service.subscribe(scope, someFunction);
        service.notify();
        expect(someFunction.called).toBeTruthy();

    });

    it('should clean up on scope.$destroy.', () => {

        let someFunction = sinon.spy(),
            scope = rootScope.$new(),
            service = notificationService.build('some event');

        service.subscribe(scope, someFunction);
        scope.$destroy();
        service.notify();
        expect(someFunction.called).toBeFalsy();

    });
});

function fixtureSetup(_notificationService_, $rootScope) {
    notificationService = _notificationService_;
    rootScope = $rootScope;
}

