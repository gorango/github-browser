class UserController {
  /** @ngInject */
  constructor($state, $stateParams, githubService, $log) {
    this.console = $log;
    this.state = $state;
    this.gh = githubService;

    const user = $stateParams.user;

    if (user) {
      githubService
      .getResource('users', user)
      .then(data => {
        if (data.status === 200) {
          this.user = data.data;
        } else {
          // error toast
        }
      });
    } else {
      // error toast
    }
  }
}

export const User = {
  template: require('./User.html'),
  controller: UserController
};
