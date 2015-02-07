angular.module('app').controller('MovieCtrl', MovieCtrl);

function MovieCtrl($rootScope, $scope, $state, $http, MovieService) {
	
	$scope.id = $rootScope.$state.params.id;

	if(!$scope.id) {
		$state.go('front-page');
	}

	$scope.movie = MovieService.getMovie($scope.id);

	console.log('Movie2: ', $scope.movie);
	
}