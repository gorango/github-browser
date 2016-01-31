import {NO_REPO} from '../utils/error.constants';

class RepoViewController {
  /** @ngInject */
  constructor($state, $timeout, $stateParams, githubService) {
    this.$state = $state;
    this.$timeout = $timeout;
    this.github = githubService;
    this.error = undefined;
    this.repo = undefined;
    this.query = $stateParams.repo ? $stateParams.repo.replace('::', '/') : '';
  }

  $onInit() {
    this.init(this.query);
  }

  init(query) {
    if (!query) {
      return this.$state.go('app');
    }

    this.github.getResource('repos', query).then(res => {
      // Using timeout to postpone loading and display spinner
      this.$timeout(() => {
        this.repo = res;
      }, 350);
    }, () => {
      this.error = {message: NO_REPO};
    });
  }
}

export const RepoView = {
  template: require('./RepoView.html'),
  controller: RepoViewController
};
