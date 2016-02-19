import {NO_REPO, NO_USER, BAD_ABSTRACT} from '../utils/error.constants';

const ERROR_MSG = {
  repos: NO_REPO,
  users: NO_USER
};

/**
 * This class is indended to be extended by RepoView and UserView components.
 * Here we abstract the duplicate operations required to query the db.
 *
 * Note the lack of `@ngInject` above the constructor.
 * Angular injection needs to be carried out in the child constructor.
 */
export class PageViewAbstract {
  constructor($timeout, $state, githubService) {
    if (this.constructor === PageViewAbstract) {
      throw new TypeError(BAD_ABSTRACT);
    }

    this.$state = $state;
    this.$timeout = $timeout;
    this.github = githubService;
  }

  initView(page, query) {
    if (!query) {
      return this.$state.go('app');
    }

    return this.$timeout(() => {
      return this.github.getResource(page, query)
        .then(
          res => {
            return {
              repos: () => {
                this.repo = res;
              },
              users: () => {
                this.user = res;
              }
            }[page]();
          },
          () => {
            this.error = {message: ERROR_MSG[page]};
          }
        );
    }, 350);
  }
}
