import {NO_USER} from '../constants/Errors';

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
          this.user.repos = data.repos.sort((a, b) => {
            if (a.stargazers_count < b.stargazers_count) {
              return 1;
            }
            if (a.stargazers_count > b.stargazers_count) {
              return -1;
            }
            return 0;
          });
        }
      });
    }, 350);
  }
}

export const User = {
  template: require('./User.html'),
  controller: UserController
};
