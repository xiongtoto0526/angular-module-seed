'use strict';

// @ngInject
export default function($scope,LogService) {
  var vm = this;
  LogService.testLog();
  LogService.queryALL().then(function(result){
  	console.log('result is:',result);
  })
debugger;
  vm.init = function() {
   console.log('begin init pm log controller...');
  };

  vm.init();
}
