import {NO_QUERY, GITHUB_ONLY, BAD_QUERY} from '../../utils/error.constants';
import {ALLOWED_HOST, REPO_PATH, TRAILING_SLASH} from '../../utils/search.constants';

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
    if (!query) {
      return this.throwError(NO_QUERY);
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
          return this.throwError(GITHUB_ONLY);
        }
      }
    }

    let repo = query.replace(TRAILING_SLASH, '').match(REPO_PATH);

    if (repo) {
      // Replacing the forward-slash to avoid ugly reformatting in the url
      const prettyPath = repo[0].replace('/', '::');
      repo = prettyPath;
      this.$state.go('repos', {repo});
    } else {
      return this.throwError(BAD_QUERY);
    }
  }
}

export const Search = {
  template: require('./Search.html'),
  controller: SearchController
};
