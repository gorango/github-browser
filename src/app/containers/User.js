class UserController {
  /** @ngInject */
  constructor($state, $stateParams, githubService, $log, $http) {
    this.console = $log;
    this.state = $state;
    this.http = $http;
    this.gh = githubService;

    const user = $stateParams.user;

    if (user) {
      githubService
      .getResource('users', user)
      .then(data => {
        if (data.status === 200) {
          this.user = data.data;
          this.console.log(this.user);
          this.http.get(this.user.repos_url)
            .then(repos => {
              this.console.log(repos);
              this.user.repos = repos.data;
            });
        } else {
          this.error = {message: 'The user you are looking for does not exist'};
        }
      });
    } else {
      // handle
    }
  }
}

export const User = {
  template: require('./User.html'),
  controller: UserController
};
