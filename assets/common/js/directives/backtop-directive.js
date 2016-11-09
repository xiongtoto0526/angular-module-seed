'use strict';

// @ngInject
export default ($location, $timeout) => {

  return {
    restrict: 'EA',
    replace: true,
    template: getTpl(),
    scope: true,
    controller: controller,
    controllerAs: 'vm',
    bindToController: {},
    link: function(scope, element, attrs) {
      $(window).scroll(function() {
        if(document.body.scrollTop>200){
          element.css('display','block');
        }else{
          element.css('display','none');
        }
      });

    }
  };

  // @ngInject
  function controller($scope) {
    let vm = this;
    vm.scrollTop=function(){
      $('html, body').animate({ scrollTop: 0 }, 'fast');
    }
  }

  function getTpl() {
    let tpl = `
    <a class="back-top-btn" ng-click='vm.scrollTop()'>
    </a>
      `;
    return tpl;
  }

}