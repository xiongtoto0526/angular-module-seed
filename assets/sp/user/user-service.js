'use strict';

// @ngInject
export default function($resource) {
  return {
    testUser: () => {
      console.log('enter sp testUser service ...');
    }
  };
}
