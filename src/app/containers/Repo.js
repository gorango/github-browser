class RepoController {
  /** @ngInject */
  constructor($state, $stateParams, githubService, $log, $http) {
    this.console = $log;
    this.state = $state;
    this.http = $http;
    this.gh = githubService;
    this.error = {};

    const repo = $stateParams.repo.replace('::', '/');

    if (!repo) {
      return this.state.go('app');
    }

    githubService
      .getResource('repos', repo)
      .then(data => {
        if (data.status === 200) {
          this.repo = data.data;
          this.http.get(this.repo.contributors_url)
            .then(contributors => {
              this.repo.contributors = contributors.data;
            });
        } else {
          this.error = {message: 'The repo you are looking for does not exist'};
        }
      });
  }
}

export const Repo = {
  template: require('./Repo.html'),
  controller: RepoController
};
