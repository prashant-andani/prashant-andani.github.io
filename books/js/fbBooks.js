var fbBook = angular.module('fbBooks', ['ngFacebook']);
  
  /*fbBook.directive('facebookLogin', ['$scope','$facebook', function($scope, $facebook){
    return {
      restrict: 'A',
      controller: function($scope, $facebook){
        $scope.$on('fb.auth.authResponseChange', function() {
          $scope.status = $facebook.isConnected();
          if($scope.status) {
            $facebook.api('/me').then(function(user) {
              $scope.user = user;
            });
          }
        });
      
        $scope.books = [];
        $scope.wants_to_read = {};
        $scope.liked_books = {};

        $scope.loginToggle = function() {
          if($scope.status) {
            $facebook.logout();
          } else {
            $facebook.login();
          }
        };

        $scope.getUserBooks = function() {

          if(!$scope.status) return;
          
          //get books that i wanted to read
          $facebook.cachedApi('/me/books.wants_to_read').then(function(books) {
            $scope.wants_to_read = books;
            $.each($scope.wants_to_read.data, function(index, book){
              $scope.books.push(book.data.book.title);
            })
          });
          
          //get books that user liked
          $facebook.cachedApi('/me/books').then(function(books) {
            $scope.liked_books = books;
            console.log($scope.liked_books);
            $.each($scope.liked_books.data, function(index, book){
              $scope.books.push(book.name);
              
            })
          });
        }
      }
      }
    }]);
  
*/
  fbBook.controller('mainCtrl', ['$scope', '$facebook', function($scope, $facebook) {
    $scope.$on('fb.auth.authResponseChange', function() {
      $scope.status = $facebook.isConnected();
      if($scope.status) {
        $facebook.api('/me').then(function(user) {
          $scope.user = user;
        });
      }
    });
    
    $scope.books = [];
    $scope.wants_to_read = {};
    $scope.liked_books = {};

    $scope.loginToggle = function() {
      if($scope.status) {
        $facebook.logout();
      } else {
        $facebook.login();
      }
    };

    $scope.getUserBooks = function() {

      if(!$scope.status) return;
      
      //get books that i wanted to read
      $facebook.cachedApi('/me/books.wants_to_read').then(function(books) {
        $scope.wants_to_read = books;
        $.each($scope.wants_to_read.data, function(index, book){
          $scope.books.push(book.data.book.title);
        })
      });
      
      //get books that user liked
      $facebook.cachedApi('/me/books').then(function(books) {
        $scope.liked_books = books;
        console.log($scope.liked_books);
        $.each($scope.liked_books.data, function(index, book){
          $scope.books.push(book.name);
          
        })
      });
      console.log($scope);
    }
    
  }]);