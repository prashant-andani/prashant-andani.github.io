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
