angular.module('app').controller('NavbarCtrl', NavbarCtrl);

function NavbarCtrl($rootScope, $scope, $http, $state) {
	$scope.isCollapsed = false;

  $scope.search = function(query) {
    if(query) {
      $state.go('search-results', {q: query});
    }
  }

  $scope.goHome = function() {
      $state.go('front-page');
      $scope.query = null; 
  }

}