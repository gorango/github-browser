import angular from 'angular';
import 'angular-mocks';
import {Error} from './Error';

describe('Error component', () => {
  beforeEach(() => {
    angular
      .module('error', ['app/components/common/Error.html'])
      .component('error', Error);
    angular.mock.module('error');
  });

  it('should render a message', angular.mock.inject(($rootScope, $compile) => {
    const $scope = $rootScope.$new();
    $scope.message = 'Test error msg.';
    const element = $compile('<error message="message"></error>')($scope);
    $scope.$digest();
    const error = element.find('p');
    expect(error.html().trim()).toEqual('Test error msg.');
  }));

  it('should render a color on form prop', angular.mock.inject(($rootScope, $compile) => {
    const $scope = $rootScope.$new();
    $scope.message = 'Test error msg.';
    $scope.form = true;
    const element = $compile('<error message="message" form="form"></error>')($scope);
    $scope.$digest();
    const error = element.find('p');
    const errorParent = element.find('div');
    expect(error.html().trim()).toEqual('Test error msg.');
    expect(errorParent.hasClass('red')).toEqual(true);
  }));

  it('should render a muted class by default', angular.mock.inject(($rootScope, $compile) => {
    const $scope = $rootScope.$new();
    $scope.message = 'Test error msg.';
    const element = $compile('<error message="message"></error>')($scope);
    $scope.$digest();
    const error = element.find('p');
    const errorParent = element.find('div');
    expect(error.html().trim()).toEqual('Test error msg.');
    expect(errorParent.hasClass('muted')).toEqual(true);
  }));
});
