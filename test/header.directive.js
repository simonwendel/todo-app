import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

let element,
    scope,
    provide,
    viewMock;

describe('Directive: headerDirective', () => {

    beforeEach(ng.module('todo', $provide => {
        provide = $provide;
    }));

    beforeEach(ng.inject(fixtureSetup));

    it('should be defined.', () => {

        expect(element.html()).toBeDefined();
        expect(element.html()).not.toBe('');

    });

    it('should call add step to next day fn to scope.', () => {

        scope.vm.nextDay();
        expect(viewMock.nextDay.calledOnce).toBe(true);

    });

    it('should call add step to previous day fn to scope.', () => {

        scope.vm.previousDay();
        expect(viewMock.previousDay.calledOnce).toBe(true);

    });

});

function fixtureSetup($rootScope, $compile) {
    viewMock = {
        nextDay: sinon.stub(),
        previousDay: sinon.stub()
    };

    provide.value('view', viewMock);

    let pageScope = $rootScope.$new();

    element = angular.element('<c-header></c-header>');
    element = $compile(element)(pageScope);
    pageScope.$digest();

    scope = element.isolateScope();
}
