export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })
    .state('repos', {
      url: '/repos/:repo',
      component: 'repo'
    })
    .state('users', {
      url: '/users/:user',
      component: 'user'
    });
}
