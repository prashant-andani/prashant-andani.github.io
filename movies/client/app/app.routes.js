angular.module('app').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider
	// public routes
		.state('front-page', {
			url: '/',
			templateUrl: 'app/movies/front-page.html',
			controller: 'FrontpageCtrl'
		})
    .state('search-results', {
      url: '/search?q',
      templateUrl: 'app/movies/search-results.html',
      controller: 'SearchCtrl'
    })
    .state('movie-page', {
      url: '/movie/:name',
      templateUrl: 'app/movies/movie-page.html',
      controller: 'MovieCtrl'
    })
    .state('in-theaters', {
      url: '/intheaters',
      templateUrl: 'app/movies/in-theaters.html',
      controller: 'InTheatersCtrl'
    })
    .state('opening', {
      url: '/opening',
      templateUrl: 'app/movies/opening.html',
      controller: 'OpeningCtrl'
    })
    .state('upcoming', {
      url: '/upcoming',
      templateUrl: 'app/movies/upcoming.html',
      controller: 'UpcomingCtrl'
    });
	
	// enable hashbang mode
	$locationProvider.hashPrefix('!');

  // set fallback route
  $urlRouterProvider.otherwise('/');

})

.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q, $window, $location) {
      return {
        request: function(config) {
          	try {
          		var youtubeRequest = config.params.youtube;
          	} catch(e) {
          		var youtubeRequest = false;
          	}
          	if ($window.localStorage.token && !youtubeRequest) {
            	config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
          	}

          	return config;
        },
        responseError: function(response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/');
          }
          return $q.reject(response);
        }
      }
    });
  });

