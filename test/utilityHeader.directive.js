import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

let element;

describe('Directive: utilityHeaderDirective', () => {

    beforeEach(ng.module('todo'));

    beforeEach(fixtureSetup);

    it('should be defined.', () => {

        expect(element.html()).toBeDefined();
        expect(element.html()).not.toBe('');

    });

});

function fixtureSetup() {
    ng.inject(($rootScope, $compile) => {
        let pageScope = $rootScope.$new();

        element = angular.element('<c-utility-header></c-utility-header>');
        element = $compile(element)(pageScope);
        pageScope.$digest();
    });
}
