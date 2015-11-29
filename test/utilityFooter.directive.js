import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

let element;

describe('Directive: utilityFooter', () => {

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

        element = angular.element('<utility-footer></utility-footer>');
        element = $compile(element)(pageScope);
        pageScope.$digest();
    });
}
