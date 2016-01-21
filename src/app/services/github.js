import {API_HOST, SECOND_SEARCH} from '../constants/SearchFilters';

export class GitHubService {
  /** @ngInject */
  constructor($http, $log) {
    this.http = $http;
    this.console = $log;
  }

  getResource(type, value) {
    const firstUrl = `${API_HOST}${type}/${value}`;

    return this.http.get(firstUrl).then(res => {
      if (res.status === 200) {
        const result = res.data;
        const prop = SECOND_SEARCH[type];
        const secondUrl = result[`${prop}_url`];

        return this.http.get(secondUrl).then(res => {
          result[prop] = res.data;
          return result;
        });
      }
    }, err => err);
  }
}
