class RepoController {
  /** @ngInject */
  constructor($state, $timeout, $stateParams, githubService) {
    this.$state = $state;
    this.$timeout = $timeout;
    this.gh = githubService;
    this.error = {};

    const repo = $stateParams.repo.replace('::', '/');

    if (!repo) {
      return this.$state.go('app');
    }

    githubService.getResource('repos', repo).then(data => {
      // Using timeout to postpone loading and display spinner
      this.$timeout(() => {
        if (data.status > 400) {
          this.error = {message: 'Oops! The repo you are looking for does not exist'};
        } else {
          this.repo = data;
        }
      }, 350);
    });
  }
}

export const Repo = {
  template: require('./Repo.html'),
  controller: RepoController
};
