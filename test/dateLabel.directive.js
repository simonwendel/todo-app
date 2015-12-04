import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

let element,
    scope,
    provide,
    momentMock,
    formatMock;

describe('Directive: dateLabelDirective (dateLabel.directive.js)', () => {

    beforeEach(ng.module('todo', ($provide) => {
        provide = $provide;
    }));

    beforeEach(ng.inject(fixtureSetup));

    it('should be defined.', () => {

        expect(element.html()).toBeDefined();
        expect(element.html()).not.toBe('');

    });

    it('should have a date string from momentFactory on scope.', () => {

        expect(momentMock.called).toBe(true);
        expect(formatMock.called).toBe(true);
        expect(scope.vm.date).toBeString();
        expect(scope.vm.date).toBe('1970-01-01');

    });

  });

function fixtureSetup($rootScope, $compile) {
    formatMock = sinon.stub().returns('1970-01-01');
    momentMock = sinon.stub().returns({
        format: formatMock
    });

    let pageScope = $rootScope.$new();

    provide.value('moment', momentMock);

    element = angular.element('<c-date-label></c-date-label>');
    element = $compile(element)(pageScope);
    pageScope.$digest();
    scope = element.isolateScope();
}
