import {
  ALLOWED_HOST,
  REPO_PATH,
  TRAILING_SLASH
} from '../constants/SearchFilters.js';

class AppController {
  /** @ngInject */
  constructor($state) {
    this.state = $state;
    this.query = '';
    this.error = {};
  }

  search(query) {
    if (!query) {
      this.error = {message: 'You need to provide a query'};
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
          this.error = {message: 'Only works for GitHub'};
        }
      }
    }

    let repo = query.replace(TRAILING_SLASH, '').match(REPO_PATH);

    if (repo) {
      // Replacing the forward-slash to avoid ugly reformatting in the url
      const prettyPath = repo[0].replace('/', '::');
      repo = prettyPath;
      this.state.go('repos', {repo});
    } else {
      this.error = {message: `Your query doesn't look right`};
    }
  }
}

export const App = {
  template: require('./App.html'),
  controller: AppController
};
