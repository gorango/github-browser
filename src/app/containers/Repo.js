class RepoController {
  /** @ngInject */
  constructor($state, $stateParams, githubService) {
    this.state = $state;
    this.gh = githubService;
    this.error = {};

    const repo = $stateParams.repo.replace('::', '/');

    if (!repo) {
      return this.state.go('app');
    }

    githubService.getResource('repos', repo).then(data => {
      if (data.status > 400) {
        this.error = {message: 'Oops! The repo you are looking for does not exist'};
      } else {
        this.repo = data;
      }
    });
  }
}

export const Repo = {
  template: require('./Repo.html'),
  controller: RepoController
};
