import {NO_QUERY, GITHUB_ONLY, BAD_QUERY} from '../../utils/error.constants';

const ALLOWED_HOST = 'github.com';
const REPO_PATH = /[^/]+\/([^/]+$)/;
const TRAILING_SLASH = /\/$/;

class SearchController {
  /** @ngInject */
  constructor($window, $timeout, $state) {
    this.$window = $window;
    this.$timeout = $timeout;
    this.$state = $state;
    this.query = this.query || '';
    this.error = this.error || {};
    this.example = 'https://github.com/angular/angular';
    this.placeholder = 'angular/angular';
  }

  $onInit() {
    this.focus();
  }

  focus() {
    this.$timeout(() => {
      const element = this.$window.document.querySelector('.searchbar input');
      if (element) {
        element.focus();
      }
    }, 0);
  }

  tryExample() {
    this.query = this.example;
    this.focus();
  }

  throwError(message) {
    this.error = {message};
  }

  search(query) {
    return new Promise((reject, resolve) => {
      if (!query) {
        this.throwError(NO_QUERY);
        reject(NO_QUERY);
      }

      this.error = {};
      let url;
      try {
        url = new URL(query);
      } catch (e) {
        // If the query is not a url, we can assume it's a path
        // and continue to the end
      } finally {
        if (url) {
          if (url.host === ALLOWED_HOST) {
            query = url.pathname;
          } else {
            this.throwError(GITHUB_ONLY);
            reject(GITHUB_ONLY);
          }
        }
      }

      let repo = query.replace(TRAILING_SLASH, '').match(REPO_PATH);

      if (repo) {
        // Replacing the forward-slash to avoid ugly reformatting in the url
        const prettyPath = repo[0].replace('/', '::');
        repo = prettyPath;
        resolve(repo);
        this.$state.go('repos', {repo});
      } else {
        this.throwError(BAD_QUERY);
        reject(BAD_QUERY);
      }
    });
  }
}

export const Search = {
  template: require('./Search.html'),
  controller: SearchController
};
