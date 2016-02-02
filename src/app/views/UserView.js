import {PageViewAbstract} from './PageView';

class UserViewController extends PageViewAbstract {
  /** @ngInject */
  constructor($timeout, $state, $stateParams, githubService) {
    super($timeout, $state, githubService);
    this.query = $stateParams.user || '';
  }

  $onInit() {
    this.initView('users', this.query);
  }
}

export const UserView = {
  template: require('./UserView.html'),
  controller: UserViewController
};
