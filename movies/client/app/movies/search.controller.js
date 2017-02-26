angular.module('app').controller('SearchCtrl', SearchCtrl);

function SearchCtrl($rootScope, $scope, $state, $http, RTService) {
	
	$scope.query = $rootScope.$state.params.q;
	var searchPromise = RTService.search($scope.query);

	searchPromise.then(function(response) {
		$scope.results = response;
		if($scope.results.length == 0) {
			$scope.error = 'Sorry, no results found';
		}
	}, function(error) {
		console.log(error);
	});

	$scope.getDet = function(poster) {
        var detailedPoster = poster.replace('_tmb', '_det');
        return detailedPoster;
    }
	
}