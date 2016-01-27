import angular from 'angular';
import 'angular-ui-router';
import 'angular-animate';

import routesConfig from './routes';

// VIEWS
import {AppView} from './app/views/AppView';
import {RepoView} from './app/views/RepoView';
import {UserView} from './app/views/UserView';

// COMPONENTS
//  - Common components
import {Error} from './app/components/common/Error';
import {Loading} from './app/components/common/Loading';
import {Logo} from './app/components/common/Logo';
import {Search} from './app/components/common/Search';
//  - RepoView components
import {ContributorItem} from './app/components/repo/ContributorItem';
import {ContributorsList} from './app/components/repo/ContributorsList';
import {RepoDetail} from './app/components/repo/RepoDetail';
import {RepoHeader} from './app/components/repo/RepoHeader';
//  - UserView components
import {RepoItem} from './app/components/user/RepoItem';
import {ReposList} from './app/components/user/ReposList';
import {UserHeader} from './app/components/user/UserHeader';

// UTILS
import {GitHubService} from './app/utils/github.service';
import externalLink from './app/utils/external-link.directive';
import timeAgo from './app/utils/time.filter';

// STYLES
//  - Shared styles
import 'ace-css/css/ace.css';
import './index.scss';
import './app/styles/animate.scss';
import './app/styles/button.scss';
import './app/styles/form.scss';
//  - Component styles
import './app/styles/loading.scss';
import './app/styles/logo.scss';
import './app/styles/repos.scss';
import './app/styles/search.scss';

angular
  .module('app', ['ui.router', 'ngAnimate'])
  .config(routesConfig)
  .service('githubService', GitHubService)
  .directive('externalLink', externalLink)
  .filter('timeAgo', timeAgo)
  .component('app', AppView)
  .component('repo', RepoView)
  .component('user', UserView)
  .component('contributorItem', ContributorItem)
  .component('contributorsList', ContributorsList)
  .component('error', Error)
  .component('loading', Loading)
  .component('logo', Logo)
  .component('repoDetail', RepoDetail)
  .component('repoHeader', RepoHeader)
  .component('repoItem', RepoItem)
  .component('reposList', ReposList)
  .component('search', Search)
  .component('userHeader', UserHeader);
