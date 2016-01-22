import angular from 'angular';
import 'angular-ui-router';
import 'angular-animate';

import routesConfig from './routes';
import {GitHubService} from './app/services/github.js';
// Containers
import {App} from './app/containers/App';
import {Repo} from './app/containers/Repo';
import {User} from './app/containers/User';
// Components
import {Error} from './app/components/Error';
import {Loading} from './app/components/Loading';
import {Logo} from './app/components/Logo';
import {Search} from './app/components/Search';
// General styles
import './index.scss';
import './app/styles/animate.scss';
import './app/styles/button.scss';
import './app/styles/form.scss';
// Component styles
import './app/styles/loading.scss';
import './app/styles/logo.scss';
import './app/styles/search.scss';

angular
  .module('app', ['ui.router', 'ngAnimate'])
  .config(routesConfig)
  .service('githubService', GitHubService)
  .component('app', App)
  .component('repo', Repo)
  .component('user', User)
  .component('error', Error)
  .component('loading', Loading)
  .component('logo', Logo)
  .component('search', Search);
