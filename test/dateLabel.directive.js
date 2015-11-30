import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

let element,
    scope;

describe('Directive: dateLabelDirective (dateLabel.directive.js)', () => {

    beforeEach(ng.module('todo'));

    beforeEach(ng.inject(fixtureSetup));

    it('should be defined.', () => {

        expect(element.html()).toBeDefined();
        expect(element.html()).not.toBe('');

    });

    it('should have a date string on scope.', () => {

        expect(scope.vm.date).toBeDefined();
        expect(scope.vm.date).toBeString();

    });

  });

function fixtureSetup($rootScope, $compile) {
    let pageScope = $rootScope.$new();
    element = angular.element('<c-date-label></c-date-label>');
    element = $compile(element)(pageScope);
    pageScope.$digest();
    scope = element.isolateScope();
}
