import angular from 'angular';
import 'angular-ui-router';
import 'ace-css/css/ace.css';

import {hello} from './app/hello';
import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .component('app', hello);
