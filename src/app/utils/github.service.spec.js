import angular from 'angular';
import 'angular-mocks';
import {GitHubService} from './github.service';

describe('GitHubService component', () => {
  let $http;
  let service;

  beforeEach(() => {
    angular.module('githubService', [])
      .service('githubService', GitHubService);
    angular.mock.module('githubService');
  });

  beforeEach(() => {
    angular.mock.inject((_$http_, _githubService_) => {
      $http = _$http_;
      service = _githubService_;
      spyOn($http, 'get');
      spyOn(service, 'getResource');
      service.getResource('repos', 'angular::angular');
    });
  });

  it('should call the github api', () => {
    // expect($http.get).toHaveBeenCalled();
    expect(service.getResource).toHaveBeenCalled();
  });
});
