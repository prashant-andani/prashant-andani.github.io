angular.module('app').controller('FrontpageCtrl', FrontpageCtrl);

function FrontpageCtrl($scope, $http, $q, $sce, MovieService) {
	
	$scope.movies = MovieService.getFrontpageMovies();

	// Convert date to readable short format e.g Nov 5 '14
	$scope.convertDate = function(date) {
		var d = new Date(date);
		var dateStr = d.toDateString();
		var dateSplit = dateStr.split(' ');
		var month = dateSplit[1];
		var day = dateSplit[2];
		var year = dateSplit[3];
		if (day.charAt(0) === '0') {
			day = day.substr(1);
		}
		year = "'" + year.substr(2);
		var outputDate = month + " " + day + " " + year;

		return outputDate;
	}
}
