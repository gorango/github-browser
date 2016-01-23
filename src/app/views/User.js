import {NO_USER} from '../utils/error.constants';

class UserController {
  /** @ngInject */
  constructor($timeout, $stateParams, githubService) {
    this.$timeout = $timeout;
    this.github = githubService;
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
          this.sort('stargazers_count');
        }
      });
    }, 350);
  }

  sort(type) {
    this.user.repos = this.user.repos.sort((a, b) => {
      if (a[type] < b[type]) {
        return 1;
      }
      if (a[type] > b[type]) {
        return -1;
      }
      return 0;
    });
  }
}

export const User = {
  template: require('./User.html'),
  controller: UserController
};
