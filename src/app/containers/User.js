
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
          this.http.get(this.user.repos_url)
            .then(repos => {
              // Sort the repos by number of stars
              this.user.repos = repos.data.sort((a, b) => {
                if (a.stargazers_count < b.stargazers_count) {
                  return 1;
                }
                if (a.stargazers_count > b.stargazers_count) {
                  return -1;
                }
                return 0;
              });
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
