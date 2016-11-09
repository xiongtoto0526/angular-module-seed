'use strict';

import sidebarActive from './sidebar-active-directive.js'
import backtop from './backtop-directive.js'

export default angular
  .module('common.directives', [])
  .directive('sidebarActive', sidebarActive)
  .directive('backtop', backtop);
