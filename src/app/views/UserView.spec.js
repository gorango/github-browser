import angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import {UserView} from './UserView';
// import {GitHubService} from '../utils';

describe('UserView component', () => {
  let $scope;
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
    angular.module('userView', ['ui.router'])
      .service('githubService', MockGitHubService)
      .component('userView', UserView);
    angular.mock.module('userView');
  });

  beforeEach(() => {
    angular.mock.inject(($rootScope, _githubService_) => {
      $scope = $rootScope.$new();
      githubService = _githubService_;
    });
  });

  it('should render user view', angular.mock.inject(($compile, $componentController) => {
    $stateParams = {user: 'foo'};
    $componentController('userView', {$scope, $stateParams, githubService});
    const element = $compile('<user-view></user-view>')($scope);
    $scope.$digest();
    expect(element.find('loading').length).toEqual(1);
  }));
});
