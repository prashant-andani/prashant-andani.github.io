var app = angular.module('books', []);

app.directive('searchView', ['$http', function($http, $scope){
        
    return {
      restrict: 'EA',
      templateUrl : 'partials/bookslist.html',
      controller: function($scope){
        $scope.is_data = '';
        $scope.keyword = 'java';
        $scope.books = '';
        $scope.base_url = window.location.host;
        $scope.getBooks = function(){
           $http.get('https://www.googleapis.com/books/v1/volumes?q='+$scope.keyword).success(
            function(data){
              //$scope.books = data;
                if(data){
                  $scope.books = data;
                  $scope.is_data = true;                  
                }else{
                  $scope.is_data = false;
                  $scope.books = '';
                }
            });
        }
        $scope.getBooks();
       
      },
      
    }
  }]);

app.controller('bookController', ['$http','$scope', '$routeParams', function($http, $scope, $routeParams){
  $scope.book = '';
  $scope.is_data = false;
  $scope.volume_id = $routeParams.volume;
  $http.get('https://www.googleapis.com/books/v1/volumes/'+$scope.volume_id).success(
    function(data){
      if(data){
        $scope.book = data;
        $scope.is_data = true;                  
      }else{
        $scope.is_data = false;
        $scope.book = '';
      }
    });
}]);

function callback(data) {
  console.log(data);
}