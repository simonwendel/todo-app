import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

let element,
    provide;

describe('Directive: checkPlatformDirective (checkPlatform.directive.js)', () => {

    beforeEach(ng.module('todo', $provide => {
        provide = $provide;
    }));

    beforeEach(ng.inject(fixtureSetup));

    it('should add a class "platform-xxx" with platform name in element.', () => {

        expect(element.hasClass('platform-blackberry')).toBe(true);

    });

});

function fixtureSetup($rootScope, $compile) {
    provide.constant('platform', 'blackberry');

    let pageScope = $rootScope.$new();
    element = angular.element('<div c-check-platform></div>');
    element = $compile(element)(pageScope);
    pageScope.$digest();
}
