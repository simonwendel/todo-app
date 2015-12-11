import 'JamieMason/Jasmine-Matchers';
import angular from 'angular';
import { ng } from 'test/utilities/mocks';

const dmr = 'September 9, 1941';

let element,
    scope,
    provide,
    viewMock;

describe('Directive: dateDirective (date.directive.js)', () => {

    beforeEach(ng.module('todo', ($provide) => {
        provide = $provide;
    }));

    beforeEach(ng.inject(fixtureSetup));

    it('should be defined.', () => {

        expect(element.html()).toBeDefined();
        expect(element.html()).not.toBe('');

    });

    it('should have a date string from view on scope.', () => {

        expect(viewMock.showDate.called).toBe(true);
        expect(scope.vm.date).toBeString();
        expect(scope.vm.date).toBe(dmr);

    });

    it('should subscribe to the view.', () => {

        expect(viewMock.subscribe.called).toBe(true);

    });

});

function fixtureSetup($rootScope, $compile) {
    viewMock = {
        showDate: sinon.stub().returns(dmr),
        today: sinon.stub(),
        subscribe: sinon.stub()
    };

    let pageScope = $rootScope.$new();

    provide.value('view', viewMock);

    element = angular.element('<c-date></c-date>');
    element = $compile(element)(pageScope);
    pageScope.$digest();
    scope = element.isolateScope();
}
