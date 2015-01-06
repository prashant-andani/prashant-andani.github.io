
 var app = angular.module('googleBooks', [
  'ngRoute','books'
]);


var base_url = window.location.origin;

app.config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
   
  $routeProvider
    .when("/", {templateUrl: "partials/home.html"})
    .when("/book", {templateUrl: "partials/book.html", controller: "bookController"})
   
}]);


