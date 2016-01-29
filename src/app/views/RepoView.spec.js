import angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import {RepoView} from './RepoView';
// import {GitHubService} from '../utils';

describe('RepoView component', () => {
  let $scope;
  let $state;
  let $stateParams;
  let githubService;

  class MockGitHubService {
    getResource(t, v) {
      return new Promise((_, res) => {
        if (t && v.length) {
          return res({data: {status: 200}});
        }
        return res({data: {status: 404}});
      });
    }
  }

  beforeEach(() => {
    angular.mock.module('ui.router');
    angular.module('repoView', ['ui.router'])
      .service('githubService', MockGitHubService)
      .component('repoView', RepoView);
    angular.mock.module('repoView');
  });

  beforeEach(() => {
    angular.mock.inject(($rootScope, _$state_, _githubService_) => {
      $scope = $rootScope.$new();
      $state = _$state_;
      githubService = _githubService_;
    });
  });

  it('should redirect home without a query', angular.mock.inject($componentController => {
    spyOn($state, 'go');
    $stateParams = {repo: ''};
    $componentController('repoView', {$scope, $stateParams, githubService});
    expect($state.go).toHaveBeenCalledWith('app');
  }));

  it('should render repo view components', angular.mock.inject(($compile, $componentController) => {
    $stateParams = {repo: 'angular::angular'};
    $componentController('repoView', {$scope, $stateParams, githubService});
    const element = $compile('<repo-view></repo-view>')($scope);
    $scope.$digest();
    expect(element.find('repo-header').length).toEqual(1);
    expect(element.find('repo-detail').length).toEqual(1);
  }));
});
