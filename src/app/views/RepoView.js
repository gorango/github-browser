import {PageViewAbstract} from './PageView';

class RepoViewController extends PageViewAbstract {
  /** @ngInject */
  constructor($timeout, $state, $stateParams, githubService) {
    super($timeout, $state, githubService);
    this.query = $stateParams.repo ? $stateParams.repo.replace('::', '/') : '';
  }

  $onInit() {
    this.initView('repos', this.query);
  }
}

export const RepoView = {
  template: require('./RepoView.html'),
  controller: RepoViewController
};
