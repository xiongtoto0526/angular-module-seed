'use strict';

import fuzzySearch from './fuzzy-search-filter.js';

export default angular
  .module('common.filters', [])
  .filter('fuzzySearch', fuzzySearch);
