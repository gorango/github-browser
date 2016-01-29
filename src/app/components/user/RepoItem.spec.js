import angular from 'angular';
import 'angular-mocks';
import {RepoItem} from './RepoItem';
import {timeAgo} from '../../utils';

describe('RepoItem component', () => {
  beforeEach(() => {
    angular.module('repoItem', ['app/components/user/RepoItem.html'])
      .filter('timeAgo', timeAgo)
      .component('repoItem', RepoItem);
    angular.mock.module('repoItem');
  });

  it('should render correctly', angular.mock.inject(($rootScope, $compile) => {
    const $scope = $rootScope.$new();
    /* eslint-disable camelcase */
    $scope.repo = {
      full_name: 'Test Subject',
      updated_at: new Date(new Date().valueOf() - 1000 * 60 * 5)
    };
    const element = $compile('<repo-item repo="repo"></repo-item>')($scope);
    $scope.$digest();
    expect(element.find('a').text()).toEqual('Test Subject');
    expect(element.find('p').text()).toEqual('Updated 5 minutes ago');
  }));
});
