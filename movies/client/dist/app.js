(function(){
"use strict;"
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



})();
(function(){
"use strict;"
angular.module('app').config(function ($httpProvider, cfpLoadingBarProvider) {

	cfpLoadingBarProvider.includeSpinner = false;
	
})
.constant('apikeys', {
    "rt" : "ydh8p54r6ubt3w5n3scvakg9",
    "tmdb" : "ca85ff10880b1490989e8dbeb5932c00"
});
})();
(function(){
"use strict;"
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
      url: '/movie/:id/:name',
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


})();
(function(){
"use strict;"
angular.module('app').directive('youtubeTrailer', function(ngDialog, $sce) {
	return{
		restrict: 'AE',
		scope: true,
		link: function(scope, elem, attrs) {
			scope.trailerUrl = $sce.trustAsResourceUrl('//www.youtube.com/embed/'+scope.movie.trailer+'?rel=0&autoplay=1&autohide=1&iv_load_policy=3');
			elem.bind('click', function() {
				ngDialog.open({ 
		        	template: '<iframe class="trailer-iframe" src="{{trailerUrl}}" frameborder="0" allowfullscreen></iframe>',
		        	plain: true,
		        	scope: scope,
		        	showClose: false,
		        	className: 'ngdialog-theme-plain trailer'
		        });
			});
		}
	};
});
})();
(function(){
"use strict;"
angular.module('app')
    .filter('noParens', function () {
        return function (input) {
            input = input || '';
            var out = "";
            var inputSplit = input.split(" (");
            out = inputSplit[0];
            return out;
        };
    });
})();
(function(){
"use strict;"
angular.module('app')
    .filter('wordLimit', function () {
        return function (input) {
            var output = '';
            var words = input.split(' ');
            var limit = 100;
            if(words.length > limit){
                output = words[0];
                for(var i=1; i < limit; i++){
                    output += ' '+words[i];
                }
            } else {
                output = input;
            }

            return output;
        };
    });
})();
(function(){
"use strict;"
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
})();
(function(){
"use strict;"
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

})();
(function(){
"use strict;"
angular.module('app').controller('InTheatersCtrl', InTheatersCtrl);

function InTheatersCtrl($scope, $http, MovieService) {

	$scope.movies = MovieService.getInTheaters();
	console.log($scope.movies);
}
})();
(function(){
"use strict;"
angular.module('app').controller('MovieCtrl', MovieCtrl);

function MovieCtrl($rootScope, $scope, $state, $http, MovieService) {
	
	$scope.id = $rootScope.$state.params.id;	
	$scope.movie_title = $rootScope.$state.params.name;	
	
	if(!$scope.id) {
		$state.go('front-page');
	}
	
	$scope.movie = MovieService.getMovie($scope.id);
	
	if($scope.movie_title){
		$http.get("https://yts.re/api/v2/list_movies.json?query_term="+$scope.movie_title)
	    	.success(function(response) {console.log(response);
	    	if(response.data.movie_count > 0){
				$scope.torrents = response.data.movies[0].torrents;
				$scope.movie_id = response.data.movies[0].id;
				$http.get("https://yts.re/api/v2/movie_suggestions.json?movie_id="+$scope.movie_id)
	    		.success(function(response) {
	    			$scope.similar_movies = response.data.movie_suggestions;
	    			console.log($scope.similar_movies);
				});
			}	
		});
	}
		/* Act on the event */
	
	
}
})();
(function(){
"use strict;"
angular.module('app').controller('OpeningCtrl', OpeningCtrl);

function OpeningCtrl($scope, $http, MovieService) {

	$scope.movies = MovieService.getOpening();
	
}
})();
(function(){
"use strict;"
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
})();
(function(){
"use strict;"
angular.module('app').controller('UpcomingCtrl', UpcomingCtrl);

function UpcomingCtrl($scope, $http, MovieService) {

	$scope.movies = MovieService.getUpcoming();

}
})();
(function(){
"use strict;"
angular.module('app').factory('MovieService', MovieService);

function MovieService($q, RTService, TmdbService, YoutubeService) {
	var MovieService = {};

	MovieService.getMovie = function(id) {
		var getMovie = RTService.getMovie(id);
		return loadMovie(getMovie);
	}

	// Returns array of movies currently in theaters
	MovieService.getInTheaters = function(limit) {
		var getInTheaters = RTService.getInTheaters(limit);
		return loadMovies(getInTheaters);
	}

	MovieService.getOpening = function(limit) {
		var getOpening = RTService.getOpening(limit);
		return loadMovies(getOpening);
	}

	MovieService.getUpcoming = function(limit) {
		var getUpcoming = RTService.getUpcoming(limit);
		return loadMovies(getUpcoming);
	}

	MovieService.getFrontpageMovies = function() {
		var loadInTheaters = RTService.getInTheaters(6);
		var loadOpening = RTService.getOpening(6);
		var loadUpcoming = RTService.getUpcoming(6);
		var intheaters = [];
		var opening = [];
		var upcoming = [];
		var frontpageMovies = {};

		$q.all([loadInTheaters, loadOpening, loadUpcoming]).then(function (response) {
			angular.forEach(response[0], function(movie) {
				var movieObj = movieOutput(movie);
				var youtubePromise = YoutubeService.search(movie.title);

				// handle yt promise
				youtubePromise.then(function(response){
				// add youtube trailer result to the obj if no trailer exists
					movieObj.trailer = response;
					intheaters.push(movieObj);
				}, function(error){ 
						console.log(error); 
				});
			});
			frontpageMovies["intheaters"] = intheaters;

			angular.forEach(response[1], function(movie) {
				var movieObj = movieOutput(movie);
				var youtubePromise = YoutubeService.search(movie.title);

				// handle yt promise
				youtubePromise.then(function(response){
				// add youtube trailer result to the obj if no trailer exists
					movieObj.trailer = response;
					opening.push(movieObj);
				}, function(error){ 
						console.log(error); 
				});
			});
			frontpageMovies["opening"]= opening;

			angular.forEach(response[2], function(movie) {
				var movieObj = movieOutput(movie);
				var youtubePromise = YoutubeService.search(movie.title);

				// handle yt promise
				youtubePromise.then(function(response){
				// add youtube trailer result to the obj if no trailer exists
					movieObj.trailer = response;
					upcoming.push(movieObj);
				}, function(error){ 
						console.log(error); 
				});
			});
			frontpageMovies["upcoming"] = upcoming;
		});

		return frontpageMovies;
	}

	// Returns Rottentomatoes movies, adds youtube trailer
	function loadMovies(promise) {
		var movies = [];

		promise.then(function(response) {
			angular.forEach(response, function(movie) {
				var movieObj = movieOutput(movie);
				var youtubePromise = YoutubeService.search(movie.title);

				// handle yt promise
				youtubePromise.then(function(response){
				// add youtube trailer result to the obj if no trailer exists
					movieObj.trailer = response;
					movies.push(movieObj);
				}, function(error){ 
						console.log(error); 
				});
			});
		});

		return movies;
	}

	// Return movie by id, add in youtube trailer
	function loadMovie(moviePromise) {
		var movie = {};

		moviePromise.then(function(rt_res) {

			// try getting imdb id
			try {
				var imdb_id = 'tt'+rt_res.alternate_ids.imdb;
				var tmdbPromise = TmdbService.getMovieByImdb(imdb_id);
				// get tmdb info
				tmdbPromise.then(function(tmdb_res) {
					if(tmdb_res) {
						var moreTmdbPromise = TmdbService.getMovieById(tmdb_res.id);

						// handle last promise to get more info from tmdb
						moreTmdbPromise.then(function(moreTmdb_res) {
							angular.copy(movieOutput(rt_res, moreTmdb_res), movie);

							// get yt trailer if not tmdb trailer
							if(movie.trailer === ''){
								var youtubePromise = YoutubeService.search(movie.title);
								youtubePromise.then(function(yt_res) {
									movie.trailer = yt_res;
								}, function(err) {
									console.log(err);
								});
							}

						}, function(err) {
							console.log('No tmdb movie found: ', err);
						});						
					} else {
						//get youtube trailer and pass on rt info
						var youtubePromise = YoutubeService.search(rt_res.title);
						angular.copy(movieOutput(rt_res), movie);

						// get youtube trailer from yt api
						youtubePromise.then(function(yt_res) {
							movie.trailer = yt_res;
						}, function(err) {
							console.log(err);
						});
					}

				}, function(err) {
					console.log('No tmdb movie found: ', err);
				});	

			} catch(e) {
				console.log('No imdb id found. ', e);
				// if no imdb id, just get youtube trailer and pass on rt info
				var youtubePromise = YoutubeService.search(rt_res.title);
				angular.copy(movieOutput(rt_res), movie);

				// get youtube trailer from yt api
				youtubePromise.then(function(yt_res) {
					movie.trailer = yt_res;
				}, function(err) {
					console.log(err);
				});
			}

		}, function(err) {
			console.log(err);
		});

		return movie;
	}

	// Returns the movie object to be displayed
	function movieOutput(movie, tmdbMovie){
		var noPoster = 'http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default.gif';
		var detPoster = getDetailed(movie.posters.detailed);
        var oriPoster = getOriginal(movie.posters.original);
        var posters = {"detailed": detPoster, "original": oriPoster, "notfound": noPoster};
        var tmdb = tmdbMovie || {};
        var output = {};
        var trailer = '';
        var theater_release = '';
        try {
        	theater_release = convertDate(movie.release_dates.theater);
        }catch(e) {
        	// no theater release
        }

		output = {
			"posters": posters,
			"id": movie.id,
        	"title": movie.title,
        	"abridged_cast": movie.abridged_cast,
        	"abridged_directors": movie.abridged_directors,
        	"synopsis": movie.synopsis,
            "ratings": movie.ratings,
            "genres": movie.genres,
            "release_dates": movie.release_dates,
            "theater_release": theater_release,
            "runtime": movie.runtime,
            "mpaa_rating": movie.mpaa_rating,
            "rtlink": movie.links.alternate,
            "tmdb": tmdb,
            "trailer": trailer
		};

		return output;
	}

	function getDetailed(poster) {
        var detailedPoster = poster.replace('_tmb', '_det');
        return detailedPoster;
    }

    function getOriginal(poster) {
        var originalPoster = poster.replace('_tmb', '_ori');
        return originalPoster;
    }

    // Convert date to readable date string e.g. Nov 15, 2014
	function convertDate(date) {
		var d = new Date(date);
		var dateStr = d.toDateString();
		var dateSplit = dateStr.split(' ');
		var month = dateSplit[1];
		var day = dateSplit[2];
		var year = dateSplit[3];
		if (day.charAt(0) === '0') {
			day = day.substr(1);
		}
		//year = "'" + year.substr(2);
		var outputDate = month + " " + day + ", " + year;

		return outputDate;
	}

	return MovieService;
}
})();
(function(){
"use strict;"
/* 
 * Service to communicate with Rottentomatoes api
 */
angular.module('app').factory('RTService', RTService);

function RTService(apikeys, $http) {
    var RTService = {};
    var key = apikeys.rt;

    // Get movie by id
    RTService.getMovie = function(id) {
        var movie = {};
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies/'+id+'.json';

        return $http.jsonp(url, {
            "params": {
            "apikey": key,
            "callback": 'JSON_CALLBACK'
            }
        }).then(function(response){
            movie = response.data;
            return movie;
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // Search for movie, returns array of movie results
    RTService.search = function(query) {
        var movies = [];
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';

        return $http.jsonp(url, {
            "params": {
                "apikey": key,
                "q": query,
                "callback": 'JSON_CALLBACK'
            }
        }).then(function(response) {
            angular.forEach(response.data.movies, function(movie) {
                try {
                    var imdb_id = movie.alternate_ids.imdb;
                    movies.push(movie);
                } catch(e) { 
                    // no imdb found, don't add to results 
                }
            });
            return movies;
        }).catch(function(error) {
            console.log(error);;
        });
    }

    RTService.getInTheaters = function(limit) {
        var movies = [];
        var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json";

        return $http.jsonp(url, {
            "params" : {
                "apikey": key,
                "callback": 'JSON_CALLBACK'
            }
        }).then(function (response) {
            angular.forEach(response.data.movies, function(movie, index) {
                if(index < limit || !limit) {
                     movies.push(movie); 
                }
            });
            return movies;
        }).catch(function(error) {
            console.log(error.data);
        });
    }

    RTService.getOpening = function(limit) {
        var movies = [];
        var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json";

        return $http.jsonp(url, {
            "params" : {
                "apikey": key,
                "callback": 'JSON_CALLBACK'
            }
        }).then(function (response) {
            angular.forEach(response.data.movies, function(movie, index) {
                if(index < limit || !limit) {
                     movies.push(movie); 
                }
            });
            return movies;
        }).catch(function(error) {
            console.log(error.data);
        });
    }

    RTService.getUpcoming = function(limit) {
        var movies = [];
        var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json";

        return $http.jsonp(url, {
            "params" : {
                "apikey": key,
                "callback": 'JSON_CALLBACK'
            }
        }).then(function (response) {
            angular.forEach(response.data.movies, function(movie, index) {
                if(index < limit || !limit) {
                     movies.push(movie); 
                }
            });
            return movies;
        }).catch(function(error) {
            console.log(error.data);
        });
    }

    return RTService;
}

})();
(function(){
"use strict;"
/* 
 * Service to communicate with TMDB api
 */
angular.module('app').factory('TmdbService', TmdbService);

function TmdbService(apikeys, $http) {
    var TmdbService = {};
    var key = apikeys.tmdb;

    // Returns the movie by tmdb id
    TmdbService.getMovieById = function(id){
        var movie = {};
        var url = 'http://api.themoviedb.org/3/movie/'+id+'?api_key='+key+'&append_to_response=videos,credits,releases';

        return $http.get(url).then(function(response) {
            movie = response.data;
            return movie;
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Returns the movie by imdb id
    TmdbService.getMovieByImdb = function(imdb_id){
        var movie = {};
        var url = "http://api.themoviedb.org/3/find/"+imdb_id+"?external_source=imdb_id&api_key="+key;

        return $http.get(url).then(function(response) {
            movie = response.data.movie_results[0];
            return movie;
        }).catch(function(error) {
            console.log(error);
        });
    }

    return TmdbService;
}

})();
(function(){
"use strict;"
angular.module('app').factory('YoutubeService', YoutubeService);

function YoutubeService($http) {

	var YoutubeService = {};

	YoutubeService.search = function (query) {
		var sourceId = '';
		var keyword = query + ' trailer';
		var youtube_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=1&v=2&alt=jsonc'; 

		return $http.get(youtube_url, { params: { youtube: true } }).then(function (response) {
			var firstResult = response.data.data.items[0];
			sourceId = firstResult.id;
			return sourceId;
		}).catch(function(error) {
			console.log(error);
		});
	}

	return YoutubeService;
}

})();