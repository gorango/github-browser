import angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import {UserView} from './UserView';
import {GitHubService} from '../utils/github.service';
import {MOCK_USER, MOCK_USER_REPOS} from '../utils/github.service.mocks';
import {NO_USER} from '../utils/error.constants';

describe('UserView component', () => {
  let $scope;
  let $rootScope;
  let $state;
  let $timeout;
  let $stateParams;
  let githubService;

  beforeEach(() => {
    angular.mock.module('ui.router');
    angular.module('userView', ['ui.router'])
      .service('githubService', GitHubService)
      .component('userView', UserView);
    angular.mock.module('userView');
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

  it('should redirect home without a query', angular.mock.inject($componentController => {
    spyOn($state, 'go');
    $stateParams = {user: ''};
    const component = $componentController('userView', {$scope, $stateParams, githubService});
    component.$onInit();
    expect($state.go).toHaveBeenCalledWith('app');
  }));

  it('should first render a loading component', angular.mock.inject($compile => {
    const element = $compile('<user-view></user-view>')($scope);
    $scope.$digest();
    expect(element.find('loading').length).toEqual(1);
  }));

  it('should fetch a user resource', angular.mock.inject(($componentController, $httpBackend) => {
    $stateParams = {user: 'angular'};
    const component = $componentController('userView', {$scope, $timeout, $stateParams, githubService});

    const API_HOST = 'https://api.github.com/';
    const type = 'users';
    const value = 'angular';
    const firstUrl = `${API_HOST}${type}/${value}`;
    const secondUrl = `${API_HOST}${type}/${value}/repos`;

    $httpBackend.whenGET(firstUrl).respond(MOCK_USER);
    $httpBackend.whenGET(secondUrl).respond(MOCK_USER_REPOS);

    spyOn(component, 'init').and.callThrough();
    spyOn(githubService, 'getResource').and.callThrough();

    component.$onInit();
    $httpBackend.flush();
    $timeout.flush();

    expect(component.init).toHaveBeenCalledWith(value);
    expect(githubService.getResource).toHaveBeenCalledWith(type, value);
    expect(component.user.name).toEqual('Angular');
  }));

  it('should assign error object if no user found', angular.mock.inject(($componentController, $httpBackend) => {
    $stateParams = {user: 'foo'};
    const component = $componentController('userView', {$scope, $timeout, $stateParams, githubService});

    const API_HOST = 'https://api.github.com/';
    const type = 'users';
    const value = 'foo';
    const firstUrl = `${API_HOST}${type}/${value}`;

    $httpBackend.whenGET(firstUrl).respond({status: 400});

    spyOn(component, 'init').and.callThrough();
    spyOn(githubService, 'getResource').and.callThrough();

    component.$onInit();
    $httpBackend.flush();
    $scope.$digest();

    expect(component.init).toHaveBeenCalledWith(value);
    expect(githubService.getResource).toHaveBeenCalledWith(type, value);
    expect(component.error.message).toEqual(NO_USER);
  }));
});
