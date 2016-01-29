import angular from 'angular';
import 'angular-mocks';
import {UserHeader} from './UserHeader';
import {timeAgo} from '../../utils';

describe('UserHeader component', () => {
  beforeEach(() => {
    angular.module('userHeader', ['app/components/user/UserHeader.html'])
      .filter('timeAgo', timeAgo)
      .component('userHeader', UserHeader);
    angular.mock.module('userHeader');
  });

  it('should render correctly', angular.mock.inject(($rootScope, $compile) => {
    const $scope = $rootScope.$new();
    $scope.user = {name: 'Test Subject'};
    const element = $compile('<user-header user="user"></user-header>')($scope);
    $scope.$digest();
    expect(element.find('h1').text().trim()).toEqual('Test Subject');
  }));
});
