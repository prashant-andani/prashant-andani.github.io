angular.module('app').controller('UpcomingCtrl', UpcomingCtrl);

function UpcomingCtrl($scope, $http, MovieService) {

	$scope.movies = MovieService.getUpcoming();

}