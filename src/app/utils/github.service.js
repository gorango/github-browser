const API_HOST = 'https://api.github.com/';
const SECOND_SEARCH = {
  repos: 'contributors',
  users: 'repos'
};

export class GitHubService {
  /** @ngInject */
  constructor($http) {
    this.http = $http;
  }

  getResource(type, value) {
    const url = `${API_HOST}${type}/${value}`;
    let result;
    let prop;

    return this.http.get(url)
      .then(res => {
        result = res.data;
        prop = SECOND_SEARCH[type];
        return result[`${prop}_url`];
      })
      .then(url => this.http.get(url))
      .then(res => {
        result[prop] = res.data;
        return result;
      });
  }
}
