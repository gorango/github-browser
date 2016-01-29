import angular from 'angular';
import 'angular-mocks';
import {Logo} from './Logo';

describe('Logo component', () => {
  beforeEach(() => {
    angular
      .module('logo', ['app/components/common/Logo.html'])
      .component('logo', Logo);
    angular.mock.module('logo');
  });

  it('should render correctly', angular.mock.inject(($rootScope, $compile) => {
    const $scope = $rootScope.$new();
    const element = $compile('<logo></logo>')($scope);
    $scope.$digest();
    expect(element.find('img').length).toEqual(1);
  }));

  it('should bind a link property', angular.mock.inject($componentController => {
    const bindings = {link: true};
    let component = $componentController('logo', {}, bindings);
    expect(component.link).toBe(true);
    bindings.link = false;
    component = $componentController('logo', {}, bindings);
    expect(component.link).toBe(false);
  }));

  it('should render a linked logo', angular.mock.inject(($rootScope, $compile) => {
    const $scope = $rootScope.$new();
    const element = $compile('<logo link="true"></logo>')($scope);
    $scope.$digest();
    const a = element.find('a');
    expect(a.attr('ui-sref')).toEqual('app');
  }));
});
