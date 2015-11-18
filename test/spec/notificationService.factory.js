;(function() {
    'use strict';

    var notificationService;

    describe('Factory: notificationService (notificationService.factory.js)', function() {

        beforeEach(module('todo'));

        beforeEach(inject(fixtureSetup));

        it('should be defined and accessible.', function() {
            expect(notificationService).toBeDefined();
        });
    });

    function fixtureSetup(_notificationService_) {
        notificationService = _notificationService_;
    }
})();
