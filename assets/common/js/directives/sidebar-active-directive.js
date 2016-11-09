'use strict';

// @ngInject
export default function($location, $state) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {

      var params = JSON.parse(attr.sidebarActive.replace(/'/g, '"'));

      scope.location = $location;
      scope.$watch('location.absUrl()', function(url) {

        var pathArray = $location.path().split('/');
        var pathTail = pathArray[pathArray.length - 1];
        var type = $location.search().type;

        if (params.type) {
          if (pathTail === params.pathTail && type === params.type) {
            element.parents('.treeview').show();
            element.parents('.treeview').addClass('active');
            element.addClass('active');
          } else {
            element.parents('.treeview').removeClass('active');
            element.removeClass('active');
          }
        } else {
          if (pathTail === params.pathTail) {
            element.parents('.treeview').show();
            element.parents('.treeview').addClass('active');
            element.addClass('active');
          } else {
            element.parents('.treeview').removeClass('active');
            element.removeClass('active');
          }
        }

        if($.AdminLTE && $.AdminLTE.layout) {
          $.AdminLTE.layout.fix();
        }
      });
    }
  };
};
