var app = angular.module('books', []);
var priceServiceApiKey = '659b4b387abab6206c7955370cc01ef85b75a875';
var books_list = {};
app.factory('bookService',['$rootScope','$facebook',function($rootScope, $facebook){
  var bookService = {};
  bookService.user_books = [];
  bookService.wants_to_read = {};
  bookService.liked_books = {};
  bookService.getFBUserBooks = function ($scope) {
    //get books that i wanted to read
    var instance_wants_to_read =  {};
    $facebook.cachedApi('/me/books.wants_to_read').then(function(books) {
      $rootScope.$broadcast('wants_to_read_books', books);

    });
    $facebook.cachedApi('/me').then(function(user_data) {
      $rootScope.$broadcast('user_data', user_data);
    });
    //get books that user liked
    $facebook.cachedApi('/me/books').then(function(books) {
      $rootScope.$broadcast('liked_books', books);
    });
    // /this.wants_to_read = instance_wants_to_read;
    
  };

  return bookService;
}]);

app.factory('priceService',['$rootScope','$http',function($rootScope, $http){
  var priceService = {};
  priceService.getBookPrice = function(isbn){
    $http.get('http://api.dataweave.in/v1/book_search/searchByIsbn/?api_key='+priceServiceApiKey+'&isbn='+isbn).success(
    function(data){
      if(data){
        console.log(data);
        $rootScope.$broadcast('priceBroadcast', data);            
      }else{
        //$scope.is_data = false;
        //$scope.book = '';
      }
    });
  }
  return priceService;
}]);

app.controller('mainCtrl', ['$scope', '$facebook', function($scope, $facebook) {
    $scope.$on('fb.auth.authResponseChange', function() {
      $scope.status = $facebook.isConnected();
      if($scope.status) {
        $facebook.api('/me').then(function(user) {
          $scope.user = user;
        });
        //$scope.getUserBooks();
       
      }
    });    
   
    $scope.loginToggle = function() {
      if($scope.status) {
        $facebook.logout();
      } else {
        $facebook.login();
      }
    };

    $scope.getUserBooks = function() {}

  }]);

app.controller('bookController', ['$http','$scope', '$routeParams','priceService', function($http, $scope, $routeParams, priceService){
  $scope.book = '';
  $scope.is_data = false;
  $scope.is_price_available = false;
  $scope.volume_id = $routeParams.volume;
  $scope.isbn = $routeParams.isbn;
  $scope.book_price_list = '';
  if($scope.isbn){
    priceService.getBookPrice($scope.isbn);
  }
  $scope.$on('priceBroadcast', function(event, price_data){
      console.log("listening the broadcast");
      if(price_data.status_code == 200){
        $scope.is_price_available = true;
        $scope.book_price_list = price_data.data;
      }
  });

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

app.directive('searchView', ['$http','$rootScope','bookService', function($http, $rootScope, bookService){
        
    return {
      restrict: 'EA',
      templateUrl : 'partials/bookslist.html',
      controller: function($scope, bookService){
        $scope.is_data = '';
        $scope.keyword = '';
        $scope.books = [];
        $scope.fb_books = [];
        $scope.base_url = window.location.host;

        bookService.getFBUserBooks();
        $scope.getBooks = function(keyword){
            var user_keyword = keyword;
            if(keyword || $scope.keyword == ''){
              user_keyword = keyword;
            }
            else{
              $scope.books = [];
              user_keyword = $scope.keyword;
            }
           $http.get('https://www.googleapis.com/books/v1/volumes?q='+user_keyword).success(
            function(data){ 
              //$scope.books = data;
                if(data){
                  $.each(data.items, function(index, value){
                    $scope.books.push(value);
                    console.log($scope.books);
                  });
                  $scope.is_data = true;                 
                }else{
                  $scope.is_data = false;
                  $scope.books = '';
                }
            });
        }
        $scope.$on('wants_to_read_books',function(event, books){
          $.each(books.data, function(index, book){            
            $scope.fb_books.push(book.data.book.title);
            $scope.getBooks(book.data.book.title);
          })
        });
        $scope.$on('user_data',function(event, user_data){
          $.each(user_data.inspirational_people, function(index, people){            
            $scope.fb_books.push(people.name);
            $scope.getBooks(people.name);
          })
        });

        $scope.$on('liked_books',function(event, books){          
          $.each(books.data, function(index, book){            
            $scope.fb_books.push(book.name);
            $scope.getBooks(book.name);

          })
        });


        
       
      },
      
    }
  }]);

function callback(data) {
  console.log(data);
}