angular.module('app').controller('OpeningCtrl', OpeningCtrl);

function OpeningCtrl($scope, $http, MovieService) {

	$scope.movies = MovieService.getOpening();
	
}