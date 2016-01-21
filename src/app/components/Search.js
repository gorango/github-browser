import {
  ALLOWED_HOST,
  REPO_PATH,
  TRAILING_SLASH
} from '../constants/SearchFilters.js';

class SearchController {
  constructor($window, $timeout, $state) {
    this.$window = $window;
    this.$timeout = $timeout;
    this.$state = $state;
    this.query = this.query || '';
    this.error = this.error || {};
    this.focus();

    this.example = 'https://github.com/angular/angular';
    this.placeholder = 'angular/angular';
  }

  tryExample() {
    this.query = this.example;
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

  search(query) {
    if (!query) {
      this.error = {
        message: 'You need to provide a query'
      };
      return;
    }

    this.error = {};
    let url;
    // Check if the query is a url by passing it to the native URL constructor.
    try {
      url = new URL(query);
    } catch (e) {
      // If the query is not a url, we can assume it's a path
      // and continue to the end
    } finally {
      if (url) {
        if (url.host === ALLOWED_HOST) {
          // the URL constructor provides a handy pathname property
          query = url.pathname;
        } else {
          this.error = {
            message: 'Only works for GitHub'
          };
          return;
        }
      }
    }

    let repo = query.replace(TRAILING_SLASH, '').match(REPO_PATH);

    if (repo) {
      // Replacing the forward-slash to avoid ugly reformatting in the url
      const prettyPath = repo[0].replace('/', '::');
      repo = prettyPath;
      this.$state.go('repos', {
        repo
      });
    } else {
      this.error = {
        message: `Your query doesn't look quite right`
      };
    }
  }
}

export const Search = {
  template: require('./Search.html'),
  controller: SearchController
};
