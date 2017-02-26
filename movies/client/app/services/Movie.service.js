angular.module('app').factory('MovieService', MovieService);

function MovieService($rootScope, $q, RTService, TmdbService, YoutubeService) {
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
		console.log("here");
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
						console.log(youtubePromise);
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