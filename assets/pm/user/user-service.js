'use strict';

// @ngInject
export default function($resource) {
  return {
    testUser: () => {
      console.log('enter pm testUser service ...');
    }
  };
}
