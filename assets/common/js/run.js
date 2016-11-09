'use strict';

// @ngInject
export default function($rootScope, $timeout, $state) {
  $timeout(function() {
    if ($.AdminLTE.layout) {
      $.AdminLTE.layout.fix();
    }
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $timeout(function() {
      if ($.AdminLTE.layout) {
        $.AdminLTE.layout.fix();
      }
    });
  });
}