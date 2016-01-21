import angular from 'angular';
import 'angular-ui-router';

import {hello} from './app/hello';
import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .component('app', hello);
