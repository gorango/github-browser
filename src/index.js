import angular from 'angular';
import 'angular-ui-router';

import routesConfig from './routes';
import {GitHubService} from './app/services/github.js';
import {App} from './app/containers/App';
import {Repo} from './app/containers/Repo';
import {User} from './app/containers/User';

import './index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .service('githubService', GitHubService)
  .component('app', App)
  .component('repo', Repo)
  .component('user', User);
