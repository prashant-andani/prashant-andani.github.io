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
