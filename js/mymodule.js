var app = angular.module('movie-directives', []);
var api_key = '3qLk48aX.TEgtqNBR0Zv2R4UoroKxRNs';

app.directive('movieView', ['$http', function($http){
    return {
      restrict: 'E',
      templateUrl : 'partials/movie.html',
      controller: function($scope){
        $http.jsonp('http://in.bookmyshow.com/getHTML.bms?cmd=TREND&rgn=GULB&callback=jsonp_callback').success(
          function(data){
              $scope.data = data;
              
          });
      }
    }
  }]);

function jsonp_callback(data) {
  console.log(data);
}