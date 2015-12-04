import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

const dmr = '1941-09-09';

let element,
    scope,
    provide,
    todoViewMock;

describe('Directive: dateLabelDirective (dateLabel.directive.js)', () => {

    beforeEach(ng.module('todo', ($provide) => {
        provide = $provide;
    }));

    beforeEach(ng.inject(fixtureSetup));

    it('should be defined.', () => {

        expect(element.html()).toBeDefined();
        expect(element.html()).not.toBe('');

    });

    it('should have a date string from todoView on scope.', () => {

        expect(todoViewMock.getDate.called).toBe(true);
        expect(scope.vm.date).toBeString();
        expect(scope.vm.date).toBe(dmr);

    });

  });

function fixtureSetup($rootScope, $compile) {
    todoViewMock = {
        getDate: sinon.stub().returns(dmr)
    };

    let pageScope = $rootScope.$new();

    provide.value('todoView', todoViewMock);

    element = angular.element('<c-date-label></c-date-label>');
    element = $compile(element)(pageScope);
    pageScope.$digest();
    scope = element.isolateScope();
}
