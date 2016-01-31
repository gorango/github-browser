import {PageViewController} from './PageView';

class UserViewController extends PageViewController {
  /** @ngInject */
  constructor($timeout, $state, $stateParams, githubService) {
    super($timeout, $state, githubService);
    this.query = $stateParams.user || '';
  }

  $onInit() {
    this.initView(this.query, 'user');
  }
}

export const UserView = {
  template: require('./UserView.html'),
  controller: UserViewController
};
