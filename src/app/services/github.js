import {API_HOST} from '../constants/SearchFilters';

function generateUrl(type, value) {
  return `${API_HOST}${type}/${value}`;
}

export class GitHubService {
  /** @ngInject */
  constructor($http, $log) {
    this.http = $http;
    this.console = $log;
  }

  getResource(type, value) {
    const url = generateUrl(type, value);
    return this.http
      .get(url)
      .then(
        data => data,
        err => err
      );
  }
}
