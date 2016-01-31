/* eslint-disable */
import angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import {RepoView} from './RepoView';
import {GitHubService} from '../utils/github.service';
import {MOCK_REPOS, MOCK_CONTRIBUTORS} from '../utils/github.service.mocks';
import {NO_REPO} from '../utils/error.constants';

describe('RepoView component', () => {
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
      .component('repoView', RepoView);
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

  it('should redirect home without a query', angular.mock.inject($componentController => {
    spyOn($state, 'go');
    $stateParams = {repo: ''};
    const component = $componentController('repoView', {$scope, $stateParams, githubService});
    component.$onInit();
    expect($state.go).toHaveBeenCalledWith('app');
  }));

  it('should first render a loading component', angular.mock.inject($compile => {
    const element = $compile('<repo-view></repo-view>')($scope);
    $scope.$digest();
    expect(element.find('loading').length).toEqual(1);
  }));

  it('should fetch a repo resource', angular.mock.inject(($componentController, $httpBackend, $compile) => {
    $stateParams = {repo: 'angular::angular'};
    const component = $componentController('repoView', {$scope, $timeout, $stateParams, githubService});

    const API_HOST = 'https://api.github.com/';
    const type = 'repos';
    const value = 'angular/angular';
    const firstUrl = `${API_HOST}${type}/${value}`;
    const secondUrl = `${API_HOST}${type}/${value}/contributors`;

    $httpBackend.whenGET(firstUrl).respond(MOCK_REPOS);
    $httpBackend.whenGET(secondUrl).respond(MOCK_CONTRIBUTORS);

    spyOn(component, 'init').and.callThrough();
    spyOn(githubService, 'getResource').and.callThrough();

    component.$onInit();
    $httpBackend.flush();
    $timeout.flush();

    expect(component.init).toHaveBeenCalledWith(value);
    expect(githubService.getResource).toHaveBeenCalledWith(type, value);
    expect(component.repo.name).toEqual('angular');

    // $scope.repo = component.repo;
    // const element = $compile('<repo-view></repo-view>')($scope);
    // $scope.$digest();
    // console.log(element[0]);
    // expect(element.find('loading').length).toEqual(1);
  }));

  it('should assign error object if no repo found', angular.mock.inject(($componentController, $httpBackend, $compile) => {
    $stateParams = {repo: 'foo::bar'};
    const component = $componentController('repoView', {$scope, $timeout, $stateParams, githubService});

    const API_HOST = 'https://api.github.com/';
    const type = 'repos';
    const value = 'foo/bar';
    const firstUrl = `${API_HOST}${type}/${value}`;

    $httpBackend.whenGET(firstUrl).respond({status: 400});

    spyOn(component, 'init').and.callThrough();
    spyOn(githubService, 'getResource').and.callThrough();

    component.$onInit();
    $httpBackend.flush();
    $scope.$digest();

    expect(component.init).toHaveBeenCalledWith(value);
    expect(githubService.getResource).toHaveBeenCalledWith(type, value);
    expect(component.error.message).toEqual(NO_REPO);

    // console.log($scope.$ctrl.error);
    // $scope.error = $scope.$ctrl.error;
    // const element = $compile('<repo-view></repo-view>')($scope);
    // $scope.$digest();
    // console.log(element[0]);
  }));
});
