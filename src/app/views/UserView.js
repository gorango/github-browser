import {NO_USER} from '../utils/error.constants';

class UserViewController {
  /** @ngInject */
  constructor($state, $timeout, $stateParams, githubService) {
    this.$state = $state;
    this.$timeout = $timeout;
    this.github = githubService;
    this.error = undefined;
    this.user = undefined;
    this.query = $stateParams.user || '';
  }

  $onInit() {
    this.init(this.query);
  }

  init(query) {
    if (!query) {
      return this.$state.go('app');
    }

    this.github.getResource('users', query).then(res => {
      // Using timeout to postpone loading and display spinner
      this.$timeout(() => {
        this.user = res;
      }, 350);
    }, () => {
      this.error = {message: NO_USER};
    });
  }
}

export const UserView = {
  template: require('./UserView.html'),
  controller: UserViewController
};
