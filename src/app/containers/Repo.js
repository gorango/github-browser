class RepoController {
  /** @ngInject */
  constructor($state, $stateParams, githubService, $log) {
    this.console = $log;
    this.state = $state;
    this.gh = githubService;
    this.error = {};

    const repo = $stateParams.repo.replace('::', '/');
    this.console.log(repo);
    this.console.log($stateParams);

    if (!repo) {
      return this.state.go('app');
    }

    githubService
      .getResource('repos', repo)
      .then(data => {
        if (data.status === 200) {
          this.repo = data.data;
        } else {
          this.console.log('yo');
          this.error = {message: 'The repo you are looking for does not exist'};
        }
      });
  }
}

export const Repo = {
  template: require('./Repo.html'),
  controller: RepoController
};
