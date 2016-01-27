class ReposListController {
  /* @ngInject */
  constructor() {
    this.sortList = [{
      value: 'language',
      label: 'Lang'
    }, {
      value: 'updated_at',
      label: 'Update'
    }, {
      value: 'forks_count',
      label: 'Forks'
    }, {
      value: 'open_issues_count',
      label: 'Issues'
    }, {
      value: 'stargazers_count',
      label: 'Stars'
    }];
  }

  $onInit() {
    this.sortBy('stargazers_count');
  }

  sortBy(prop) {
    if (prop === this.active) {
      this.repos = this.repos.reverse();
      this.reverse = !this.reverse;
    } else {
      this.active = prop;
      this.reverse = false;
      const repos = this.repos;

      switch (prop) {
        case 'language':
          prop = 'compareLanguage';
          repos.forEach(r => {
            if (r.language) {
              r[prop] = r.language.slice(0, 1);
            } else {
              r[prop] = 'zzz';
            }
          });
          this.repos = repos.sort((a, b) => this._doSort(b, a, prop));
          break;

        case 'updated_at':
          prop = 'compareUpdate';
          repos.forEach(r => {
            r[prop] = new Date(r.updated_at);
          });
          this.repos = repos.sort((a, b) => this._doSort(a, b, prop));
          break;

        default:
          this.repos = repos.sort((a, b) => this._doSort(a, b, prop));
          break;
      }
    }
  }

  _doSort(a, b, prop) {
    if (a[prop] < b[prop]) {
      return 1;
    }
    if (a[prop] > b[prop]) {
      return -1;
    }
    return 0;
  }
}

export const ReposList = {
  template: require('./ReposList.html'),
  controller: ReposListController,
  bindings: {
    repos: '<'
  }
};
