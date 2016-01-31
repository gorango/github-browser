import angular from 'angular';
import 'angular-mocks';
import {GitHubService} from './github.service';
import {MOCK_REPOS, MOCK_CONTRIBUTORS, MOCK_USER, MOCK_USER_REPOS} from './github.service.mocks';

describe('GitHubService component', () => {
  let $httpBackend;
  let githubService;

  const API_HOST = 'https://api.github.com/';

  beforeEach(() => {
    angular.module('githubService', [])
      .service('githubService', GitHubService);
    angular.mock.module('githubService');
  });

  beforeEach(() => {
    angular.mock.inject((_$httpBackend_, _githubService_) => {
      $httpBackend = _$httpBackend_;
      githubService = _githubService_;
    });
  });

  it('should exist', () => {
    expect(githubService).toBeDefined();
  });

  describe('.getResource()', () => {
    let result;

    beforeEach(() => {
      result = {};
      spyOn(githubService, 'getResource').and.callThrough();
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should return a repo and collaborators', () => {
      const type = 'repos';
      const value = 'angular/angular';
      const firstUrl = `${API_HOST}${type}/${value}`;
      const secondUrl = `${API_HOST}${type}/${value}/contributors`;

      $httpBackend.whenGET(firstUrl).respond(MOCK_REPOS);
      $httpBackend.whenGET(secondUrl).respond(MOCK_CONTRIBUTORS);

      expect(githubService.getResource).not.toHaveBeenCalled();
      expect(result).toEqual({});

      githubService.getResource(type, value)
        .then(res => {
          result = res;
        });

      $httpBackend.flush();

      expect(githubService.getResource).toHaveBeenCalledWith(type, value);
      expect(result.name).toEqual('angular');
      expect(result.contributors.length).toEqual(2);
    });

    it('should return a user and repos', () => {
      const type = 'users';
      const value = 'angular';
      const firstUrl = `${API_HOST}${type}/${value}`;
      const secondUrl = `${API_HOST}${type}/${value}/repos`;

      $httpBackend.whenGET(firstUrl).respond(MOCK_USER);
      $httpBackend.whenGET(secondUrl).respond(MOCK_USER_REPOS);

      expect(githubService.getResource).not.toHaveBeenCalled();
      expect(result).toEqual({});

      githubService.getResource(type, value)
        .then(res => {
          result = res;
        });

      $httpBackend.flush();

      expect(githubService.getResource).toHaveBeenCalledWith(type, value);
      expect(result.name).toEqual('Angular');
      expect(result.repos.length).toEqual(2);
    });
  });
});
