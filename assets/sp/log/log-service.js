'use strict';

// @ngInject
export default function($resource) {
  return {
    testLog: () => {
      console.log('enter sp testLog service ...');
    }
  };
}
