import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

const dmr = '1941-09-09';

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

        expect(viewMock.getDate.called).toBe(true);
        expect(scope.vm.date).toBeString();
        expect(scope.vm.date).toBe(dmr);

    });

  });

function fixtureSetup($rootScope, $compile) {
    viewMock = {
        getDate: sinon.stub().returns(dmr)
    };

    let pageScope = $rootScope.$new();

    provide.value('view', viewMock);

    element = angular.element('<c-date></c-date>');
    element = $compile(element)(pageScope);
    pageScope.$digest();
    scope = element.isolateScope();
}
