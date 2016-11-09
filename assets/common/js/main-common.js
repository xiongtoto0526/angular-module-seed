'use strict';

import run from './run';
import config from './config';
import services from './services';
import directives from './directives';
import filters from './filters';

if (!window.SEASUN) {
  window.SEASUN = { };
}

export default angular.module('SEASUN.common', [
  'ngResource',
  'ngWebSocket',
  'ngStorage',
  'ngFileUpload',

  'ui.router',
  'ui.select',
  'ui.bootstrap',

  'angular-flippy',

  'monospaced.qrcode',
  'toastr',
  'bootstrapLightbox',
  'daterangepicker',

  config.name,
  services.name,
  directives.name,
  filters.name
]).run(run);
