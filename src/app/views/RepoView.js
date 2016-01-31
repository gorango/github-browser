import {PageViewController} from './PageView';

class RepoViewController extends PageViewController {
  /** @ngInject */
  constructor($timeout, $state, $stateParams, githubService) {
    super($timeout, $state, githubService);
    this.query = $stateParams.repo ? $stateParams.repo.replace('::', '/') : '';
  }

  $onInit() {
    this.initView(this.query, 'repo');
  }
}

export const RepoView = {
  template: require('./RepoView.html'),
  controller: RepoViewController
};
