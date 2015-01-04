var app = angular.module('books', []);

app.directive('searchView', ['$http', function($http, $scope){
        
    return {
      restrict: 'E',
      templateUrl : 'partials/books.html',
      controller: function($scope){
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
        $scope.is_data = '';
        $scope.keyword = 'java';
        $scope.books = '';
        if(keyword){
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
      },
      
    }
  }]);

function callback(data) {
  console.log(data);
}