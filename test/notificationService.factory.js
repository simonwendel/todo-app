import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';
import { notificationServiceFactory } from 'js/notificationService.factory';

let notificationService,
    rootScope;

describe('Factory: notificationServiceFactory (notificationService.factory.js)', () => {

    beforeEach(ng.inject(fixtureSetup));

    describe('Product: notificationService', () => {

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
            expect(someFunction.called).toBe(true);

        });

        it('should clean up on scope.$destroy.', () => {

            let someFunction = sinon.spy(),
                scope = rootScope.$new(),
                service = notificationService.build('some event');

            service.subscribe(scope, someFunction);
            scope.$destroy();
            service.notify();
            expect(someFunction.called).toBe(false);

        });

    })

});

function fixtureSetup($rootScope) {
    rootScope = $rootScope;
    notificationService = notificationServiceFactory(rootScope);
}
