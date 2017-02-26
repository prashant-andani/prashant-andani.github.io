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
