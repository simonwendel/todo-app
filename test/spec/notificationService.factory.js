;(function() {
    'use strict';

    var notificationService,
        rootScope;

    describe('Factory: notificationService (notificationService.factory.js)', function() {

        beforeEach(module('todo'));

        beforeEach(inject(fixtureSetup));

        it('should be defined and accessible.', function() {
            expect(notificationService).toBeDefined();
        });

        it('should have a build function.', function() {
            expect(notificationService.build('some event')).toBeDefined();
        });

        it('should return a notification service from build which consumers can subscribe to.', function() {
            var someFunction = sinon.spy(),
                scope = rootScope.$new(),
                service = notificationService.build('some event');

            service.subscribe(scope, someFunction);
        });

        it('should call subscriber back on notify.', function() {
            var someFunction = sinon.spy(),
                scope = rootScope.$new(),
                service = notificationService.build('some event');

            service.subscribe(scope, someFunction);
            service.notify();
            expect(someFunction.called).toBeTruthy();
        });

        it('should clean up on scope.$destroy.', function() {
            var someFunction = sinon.spy(),
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
})();
