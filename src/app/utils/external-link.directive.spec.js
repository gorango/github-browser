import angular from 'angular';
import 'angular-mocks';
import directive from './external-link.directive';

describe('External link directive', () => {
  let $scope;
  let element;

  beforeEach(() => {
    angular.module('linkDirective', [])
      .directive('externalLink', directive);
    angular.mock.module('linkDirective');
    angular.mock.inject(($rootScope, $compile) => {
      $scope = $rootScope.$new();
      element = $compile('<span external-link="http://example.com">Inner Text</span>')($scope);
    });
  });

  it('should append a link to element', () => {
    expect(element.find('a').length).toEqual(1);
  });

  it('should add a relative class to element', () => {
    expect(element.hasClass('relative')).toBe(true);
  });
});
