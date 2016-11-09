'use strict';

// @ngInject
import pinyin from 'pinyin';

// @ngInject
//
var fuzzySearchFilter = function() {
  return function(selectContents, displayName, search) {
    if (!search) {
      return selectContents;
    }
    return getSearchResult(selectContents, displayName, search);
  };

  function getSearchResult(selectContents, displayName, search) {
    var searchArr = pinyin(search, {style: pinyin.STYLE_NORMAL});
    var seachStr = searchArr.join().toLowerCase().replace('/,/g', '');
    var result = _.filter(selectContents, function(content) {
      var contentArr;
      if (displayName && displayName != '$self') {
        contentArr = pinyin(content[displayName], {
          style: pinyin.STYLE_NORMAL
        });
      } else {
        contentArr = pinyin(content, {
          style: pinyin.STYLE_NORMAL
        });
      }

      var contentStr = contentArr.join().toLowerCase().replace('/,/g', '');
      var initialLetterString = '';

      _.each(contentArr, function(v) {
        initialLetterString += v.toString().charAt(0);
      });

      var isFullMatch = contentStr.indexOf(seachStr) > -1;
      var isInitialLetterMatch = initialLetterString.indexOf(seachStr) > -1;
      return isFullMatch ? isFullMatch : isInitialLetterMatch;
    });
    return result;

  }
};
export default fuzzySearchFilter;
