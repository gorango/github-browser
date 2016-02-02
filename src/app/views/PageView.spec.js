import angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import {PageViewAbstract} from './PageView';
import {RepoView} from './RepoView';
import {UserView} from './UserView';
import {GitHubService} from '../utils/github.service';
import {MOCK_REPOS, MOCK_CONTRIBUTORS, MOCK_USER, MOCK_USER_REPOS} from '../utils/github.service.mocks';
import {NO_REPO, NO_USER} from '../utils/error.constants';

describe('PageView component', () => {
  let $scope;
  let $rootScope;
  let $state;
  let $timeout;
  let $stateParams;
  let githubService;

  beforeEach(() => {
    angular.mock.module('ui.router');
    angular.module('repoView', ['ui.router'])
      .service('githubService', GitHubService)
      .component('pageView', PageViewAbstract)
      .component('repoView', RepoView)
      .component('userView', UserView);
    angular.mock.module('repoView');
  });

  beforeEach(() => {
    angular.mock.inject((_$rootScope_, _$timeout_, _$state_, _githubService_) => {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $timeout = _$timeout_;
      $state = _$state_;
      githubService = _githubService_;
    });
  });

  it('should only be used as an abstract class', () => {
    const err = new Error('Cannot construct PageViewAbstract instances directly');
    expect(() => {
      return new PageViewAbstract();
    }).toThrow(err);
  });

  it('should first render a loading component', angular.mock.inject($compile => {
    const element = $compile('<repo-view></repo-view>')($scope);
    $scope.$digest();
    expect(element.find('loading').length).toEqual(1);
  }));

  describe('Repo View', () => {
    it('should redirect home without a repo query', angular.mock.inject($componentController => {
      spyOn($state, 'go');
      $stateParams = {repo: ''};
      const component = $componentController('repoView', {$scope, $stateParams, githubService});
      component.$onInit();
      expect($state.go).toHaveBeenCalledWith('app');
    }));

    it('should fetch a repo resource', angular.mock.inject(($componentController, $httpBackend) => {
      $stateParams = {repo: 'angular::angular'};
      const component = $componentController('repoView', {$scope, $timeout, $state, $stateParams, githubService});

      const API_HOST = 'https://api.github.com/';
      const type = 'repos';
      const value = 'angular/angular';
      const firstUrl = `${API_HOST}${type}/${value}`;
      const secondUrl = `${API_HOST}${type}/${value}/contributors`;

      $httpBackend.whenGET(firstUrl).respond(MOCK_REPOS);
      $httpBackend.whenGET(secondUrl).respond(MOCK_CONTRIBUTORS);

      spyOn(component, 'initView').and.callThrough();
      spyOn(githubService, 'getResource').and.callThrough();

      component.$onInit();
      $timeout.flush();
      $httpBackend.flush();

      expect(component.initView).toHaveBeenCalledWith(type, value);
      expect(githubService.getResource).toHaveBeenCalledWith(type, value);
      expect(component.repo.name).toEqual('angular');
    }));

    it('should assign error object if no repo found', angular.mock.inject(($componentController, $httpBackend) => {
      $stateParams = {repo: 'foo::bar'};
      const component = $componentController('repoView', {$scope, $timeout, $state, $stateParams, githubService});

      const API_HOST = 'https://api.github.com/';
      const type = 'repos';
      const value = 'foo/bar';
      const firstUrl = `${API_HOST}${type}/${value}`;

      $httpBackend.whenGET(firstUrl).respond({status: 400});

      spyOn(component, 'initView').and.callThrough();
      spyOn(githubService, 'getResource').and.callThrough();

      component.$onInit();
      $timeout.flush();
      $httpBackend.flush();

      expect(component.initView).toHaveBeenCalledWith(type, value);
      expect(githubService.getResource).toHaveBeenCalledWith(type, value);
      expect(component.error.message).toEqual(NO_REPO);
    }));
  });

  describe('User View', () => {
    it('should redirect home without a user query', angular.mock.inject($componentController => {
      spyOn($state, 'go');
      $stateParams = {user: ''};
      const component = $componentController('userView', {$scope, $stateParams, githubService});
      component.$onInit();
      expect($state.go).toHaveBeenCalledWith('app');
    }));

    it('should fetch a user resource', angular.mock.inject(($componentController, $httpBackend) => {
      $stateParams = {user: 'angular'};
      const component = $componentController('userView', {$scope, $timeout, $state, $stateParams, githubService});

      const API_HOST = 'https://api.github.com/';
      const type = 'users';
      const value = 'angular';
      const firstUrl = `${API_HOST}${type}/${value}`;
      const secondUrl = `${API_HOST}${type}/${value}/repos`;

      $httpBackend.whenGET(firstUrl).respond(MOCK_USER);
      $httpBackend.whenGET(secondUrl).respond(MOCK_USER_REPOS);

      spyOn(component, 'initView').and.callThrough();
      spyOn(githubService, 'getResource').and.callThrough();

      component.$onInit();
      $timeout.flush();
      $httpBackend.flush();

      expect(component.initView).toHaveBeenCalledWith(type, value);
      expect(githubService.getResource).toHaveBeenCalledWith(type, value);
      expect(component.user.name).toEqual('Angular');
    }));

    it('should assign error object if no user found', angular.mock.inject(($componentController, $httpBackend) => {
      $stateParams = {user: 'foo'};
      const component = $componentController('userView', {$scope, $timeout, $state, $stateParams, githubService});

      const API_HOST = 'https://api.github.com/';
      const type = 'users';
      const value = 'foo';
      const firstUrl = `${API_HOST}${type}/${value}`;

      $httpBackend.whenGET(firstUrl).respond({status: 400});

      spyOn(component, 'initView').and.callThrough();
      spyOn(githubService, 'getResource').and.callThrough();

      component.$onInit();
      $timeout.flush();
      $httpBackend.flush();

      expect(component.initView).toHaveBeenCalledWith(type, value);
      expect(githubService.getResource).toHaveBeenCalledWith(type, value);
      expect(component.error.message).toEqual(NO_USER);
    }));
  });
});
