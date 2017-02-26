angular.module('app').config(function ($httpProvider, cfpLoadingBarProvider) {

	cfpLoadingBarProvider.includeSpinner = false;
	
})
.constant('apikeys', {
    //"rt" : "ydh8p54r6ubt3w5n3scvakg9",
    //"tmdb" : "ca85ff10880b1490989e8dbeb5932c00"
});