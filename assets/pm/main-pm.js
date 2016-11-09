'use strict';

import run from './run';
import route from './route';

import directives from './directives';
import filters from './filters';

// controllers
import LogController from './log/log-controller';
import UserController from './user/user-controller';

// services
import LogService from './log/log-service';
import UserService from './user/user-service';

if (!window.SEASUN) {
  window.SEASUN = { };
}


  // controllers
var controllerModule = angular
  .module('app.controllers', [])
  .controller('LogController', LogController)
  .controller('UserController', UserController);

// services
var serviceModule = angular
  .module('app.services', [])
  .factory('LogService', LogService)
  .factory('UserService', UserService);

window.SEASUN.initPm = function() {
  angular.module('SEASUN.pm', [
    'SEASUN.common',
    'assets.template.pm',    
     route.name,
     controllerModule.name,
     directives.name,
     serviceModule.name,
     filters.name
  ])
  .run(run);

  $(function() {
    angular.element(document).ready(function() {
      // debugger; // todo: this point will enter more than onece
      angular.bootstrap(document, ['SEASUN.pm']);
    });
  });

};
