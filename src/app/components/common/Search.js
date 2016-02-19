import {NO_QUERY, GITHUB_ONLY, BAD_QUERY} from '../../utils/error.constants';

const ALLOWED_HOST = 'github.com';
const REPO_PATH = /[^/]+\/([^/]+$)/;
const TRAILING_SLASH = /\/$/;
const RE_URL = new RegExp([
  '^(https?:)//', // protocol
  '(([^:/?#]*)(?::([0-9]+))?)', // host (hostname and port)
  '(/{0,1}[^?#]*)' // pathname
].join(''));

function getURL(href) {
  const match = href.match(RE_URL);
  return match && {
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5]
  };
}

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
      return element && element.focus();
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
    if (query) {
      this.error = {};
      const url = getURL(query);

      if (url) {
        if (url.host === ALLOWED_HOST) {
          query = url.pathname;
        } else {
          return this.throwError(GITHUB_ONLY);
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
    } else {
      return this.throwError(NO_QUERY);
    }
  }
}

export const Search = {
  template: require('./Search.html'),
  controller: SearchController
};
