'use strict';

// @ngInject
export default function($resource) {
  return {
    testLog: () => {
      console.log('enter pm testLog service ...');
    },
    queryALL: () => {
      return $resource('/apis/auth/log/logs').get().$promise;
    }
  };
}
