import angular from 'angular';
import 'angular-mocks';
import {ReposList} from './ReposList';

describe('ReposList component', () => {
  let component;

  /* eslint-disable camelcase */
  const repos = [{
    full_name: 'First Repo',
    language: 'FooBar',
    updated_at: new Date(new Date().valueOf() - 1000 * 60 * 1),
    stargazers_count: 1
  }, {
    full_name: 'Second Repo',
    language: 'SooBar',
    updated_at: new Date(new Date().valueOf() - 1000 * 60 * 2),
    stargazers_count: 2
  }, {
    full_name: 'Third Repo',
    language: 'TooBar',
    updated_at: new Date(new Date().valueOf() - 1000 * 60 * 5),
    stargazers_count: 3
  }];
  /* eslint-enable camelcase */

  beforeEach(() => {
    angular.module('reposList', ['app/components/user/ReposList.html'])
      .component('reposList', ReposList);
    angular.mock.module('reposList');
  });

  beforeEach(() => {
    angular.mock.inject($componentController => {
      const bindings = {repos: angular.copy(repos)};
      component = $componentController('reposList', {}, bindings);
    });
  });

  it('should render correctly', angular.mock.inject(($rootScope, $compile) => {
    const $scope = $rootScope.$new();
    $scope.repos = repos;
    const element = $compile('<repos-list repos="repos"></repos-list>')($scope);
    $scope.$digest();
    expect(element.find('repo-item').length).toEqual(3);
  }));

  it('should sort on initialization', () => {
    spyOn(component, 'sortBy');
    component.$onInit();
    expect(component.sortBy).toHaveBeenCalled();
  });

  it('should switch sort order', () => {
    const prop = 'stargazers_count';
    spyOn(component, '_doSort');
    expect(component.active).toEqual('');
    component.sortBy(prop);
    expect(component.active).toEqual(prop);
    expect(component.reverse).toEqual(false);
    expect(component._doSort).toHaveBeenCalled();
    component.sortBy(prop);
    expect(component.reverse).toEqual(true);
    expect(component.repos[0][prop]).toEqual(1);
  });

  it('should sort by language', () => {
    const prop = 'language';
    component.sortBy(prop);
    expect(component.active).toEqual(prop);
    expect(component.repos[0][prop]).toEqual(repos[2][prop]);
    component.sortBy(prop);
    expect(component.repos[0][prop]).toEqual(repos[0][prop]);
  });

  it('should sort by date', () => {
    const prop = 'updated_at';
    component.sortBy(prop);
    expect(component.active).toEqual(prop);
    expect(component.repos[0][prop]).toEqual(repos[2][prop]);
    component.sortBy(prop);
    expect(component.repos[0][prop]).toEqual(repos[0][prop]);
  });
});
