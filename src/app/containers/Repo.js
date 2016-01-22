import {NO_REPO} from '../constants/Errors';

class RepoController {
  /** @ngInject */
  constructor($state, $timeout, $stateParams, githubService) {
    this.$state = $state;
    this.$timeout = $timeout;
    this.github = githubService;
    this.error = {};

    const repo = $stateParams.repo.replace('::', '/');

    if (!repo) {
      return this.$state.go('app');
    }

    this.init(repo);
  }

  init(repo) {
    this.github.getResource('repos', repo).then(data => {
      // Using timeout to postpone loading and display spinner
      this.$timeout(() => {
        if (data.status > 400) {
          this.error = {message: NO_REPO};
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
