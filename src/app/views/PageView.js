import {NO_REPO, NO_USER} from '../utils/error.constants';

const ERROR_MSG = {
  repo: NO_REPO,
  user: NO_USER
};

export class PageViewController {
  constructor($timeout, $state, githubService) {
    this.$state = $state;
    this.$timeout = $timeout;
    this.github = githubService;
  }

  initView(query, page) {
    if (!query) {
      return this.$state.go('app');
    }

    return this.$timeout(() => {
      return this.github.getResource(`${page}s`, query)
        .then(
          res => {
            return {
              repo: () => {
                this.repo = res;
              },
              user: () => {
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
