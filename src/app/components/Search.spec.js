import angular from 'angular';
import 'angular-mocks';
import {Search} from './Search';

describe('Search component', () => {
  class MockSearchService {
  }

  beforeEach(() => {
    angular
      .module('search', ['app/components/Search.html', 'ui-router'])
      .service('searchService', MockSearchService)
      .component('search', Search);
    angular.mock.module('search');
  });

  it('should render correctly', angular.mock.inject(($rootScope, $compile) => {
    const $scope = $rootScope.$new();
    const element = $compile('<search></search>')($scope);
    $scope.$digest();
    const textInput = element.find('input');
    expect(textInput.attr('type')).toEqual('text');
  }));

  it('should bind the text to the element', angular.mock.inject($componentController => {
    const bindings = {
      text: 'Hello'
    };
    const component = $componentController('search', {}, bindings);
    expect(component.text).toEqual('Hello');
  }));

  it('should call focus on element construction', angular.mock.inject($componentController => {
    const focusSpy = jasmine.createSpy('focusSpy');
    const bindings = {
      text: 'Hello',
      focus: focusSpy
    };
    const component = $componentController('search', {}, bindings);
    expect(component.focus).toHaveBeenCalled();
  }));

  it('should not call focus on element construction', angular.mock.inject($componentController => {
    const focusSpy = jasmine.createSpy('focusSpy');
    const bindings = {
      focus: focusSpy
    };
    const component = $componentController('search', {}, bindings);
    expect(component.focus).not.toHaveBeenCalled();
  }));
});
