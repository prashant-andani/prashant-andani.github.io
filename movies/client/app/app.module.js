angular.module('app', [
	'ngResource',
	'ngDialog',
	'ui.bootstrap',
	'ui.router',
	'angular-loading-bar'
])

.run(function ($rootScope, $state, $window) {
	// expose state
	$rootScope.$state = $state;

	$rootScope.$on('$stateChangeSuccess', function(ev, toState, toParams, fromState, fromParams) {
		$window.scroll(0,0);
    });

    $rootScope.wordCount = function(input) {
    	var words = input.split(' ');
    	return words.length;
    }
});


