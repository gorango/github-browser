import angular from 'angular';
import 'angular-ui-router';
import 'angular-mocks';
import {Search} from './Search';
import {NO_QUERY, GITHUB_ONLY, BAD_QUERY} from '../../utils/error.constants';

describe('Search component', () => {
  beforeEach(() => {
    angular.mock.module('ui.router');
    angular.module('search', ['ui.router'])
      .config($stateProvider => {
        $stateProvider
          .state('search', {
            url: '/',
            component: 'search'
          });
      })
      .component('search', Search);
    angular.mock.module('search');
  });

  describe('Form functions', () => {
    let $scope;
    let element;
    let input;
    let component;

    beforeEach(() => {
      angular.mock.inject(($rootScope, $compile, $componentController) => {
        $scope = $rootScope.$new();
        element = $compile('<search></search>')($scope);
        input = element.find('input');
        component = $componentController('search', {});
      });
    });

    it('should render correctly', () => {
      $scope.$digest();
      expect(input.attr('name')).toEqual('query');
      expect(input.attr('placeholder')).toEqual(component.placeholder);
      expect(input.val()).toEqual('');
      expect(component.error).toEqual({});
    });

    it('should populate example query', () => {
      expect(component.query).toEqual('');
      component.tryExample();
      expect(component.query).toEqual(component.example);
    });

    it('should focus input on example query', () => {
      spyOn(component, 'focus');
      expect(component.focus).not.toHaveBeenCalled();
      component.tryExample();
      expect(component.focus).toHaveBeenCalled();
    });

    it('should throw error correctly', () => {
      expect(component.error).toEqual({});
      const obj = {message: 'Bad move'};
      component.throwError(obj.message);
      expect(component.error).toEqual(obj);
    });
  });

  describe('Search function', () => {
    let $scope;
    let $state;
    let component;

    beforeEach(() => {
      angular.mock.inject(($rootScope, $compile, $componentController) => {
        $scope = $rootScope.$new();
        component = $componentController('search', {$scope});
        spyOn(component, 'throwError');
      });
    });

    beforeEach(() => {
      angular.mock.inject(_$state_ => {
        $state = _$state_;
        spyOn($state, 'go');
      });
    });

    it('should throw error without query', () => {
      expect(component.throwError).not.toHaveBeenCalled();
      component.search('');
      expect(component.throwError).toHaveBeenCalledWith(NO_QUERY);
      expect($state.go).not.toHaveBeenCalled();
    });

    it('should accept github urls', () => {
      component.search('https://github.com/foo/bar')
        .then(repo => {
          expect($state.go).toHaveBeenCalledWith({repo});
        });
    });

    it('should deny non-github urls', () => {
      expect(component.throwError).not.toHaveBeenCalled();
      component.search('http://example.com/foo/bar');
      expect(component.throwError).toHaveBeenCalledWith(GITHUB_ONLY);
    });

    it('should accept "user/repo" query', () => {
      component.search('foo/bar');
      expect($state.go).toHaveBeenCalled();
    });

    it('should deny bad format in query', () => {
      expect(component.throwError).not.toHaveBeenCalled();
      component.search('foobar');
      expect(component.throwError).toHaveBeenCalledWith(BAD_QUERY);
      expect($state.go).not.toHaveBeenCalled();
    });
  });
});
