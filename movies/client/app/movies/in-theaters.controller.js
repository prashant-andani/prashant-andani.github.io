angular.module('app').controller('InTheatersCtrl', InTheatersCtrl);

function InTheatersCtrl($scope, $http, MovieService) {

	$scope.movies = MovieService.getInTheaters();
	console.log($scope.movies);
}