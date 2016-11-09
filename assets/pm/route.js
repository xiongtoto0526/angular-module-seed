'use strict';

export default angular.module('app.route', [])

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', { url: '/', templateUrl: '' })

      .state('log', {
        url: '/log',
        templateUrl: 'views/log/log.tpl.html',
        controller: 'LogController as vm'
      })

      .state('user', {
        url: '/user',
        templateUrl: 'views/user/user.tpl.html',
        controller: 'UserController as vm'
      });

  });
