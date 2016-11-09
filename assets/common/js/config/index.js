'use strict';

import HttpInterceptor from './http-interceptor.js';
import ToastrConfig from './toastr-config.js';

export default angular
  .module('common.config', [])
  .config(HttpInterceptor)
  .config(ToastrConfig);
