
class UserController {
  /** @ngInject */
  constructor($timeout, $stateParams, githubService) {
    this.$timeout = $timeout;
    this.gh = githubService;

    const user = $stateParams.user;

    if (user) {
      // Using timeout to postpone loading and display spinner
      this.$timeout(() => {
        githubService.getResource('users', user).then(data => {
          if (data.status > 400) {
            this.error = {message: 'The user you are looking for does not exist'};
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
    } else {
      // handle
    }
  }
}

export const User = {
  template: require('./User.html'),
  controller: UserController
};
