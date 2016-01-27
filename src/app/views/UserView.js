import {NO_USER} from '../utils/error.constants';

class UserViewController {
  /** @ngInject */
  constructor($timeout, $stateParams, githubService, $log) {
    this.$timeout = $timeout;
    this.github = githubService;
    this.console = $log;
    this.init($stateParams.user);
  }

  init(user) {
    // Using timeout to postpone loading and display spinner
    this.$timeout(() => {
      this.github.getResource('users', user).then(data => {
        if (data.status > 400) {
          this.error = {message: NO_USER};
        } else {
          this.user = data;
        }
      });
    }, 350);
  }
}

export const UserView = {
  template: require('./UserView.html'),
  controller: UserViewController
};
