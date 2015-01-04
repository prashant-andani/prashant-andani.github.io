
 var app = angular.module('googleBooks', [
  'ngRoute','books'
]);




app.config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
   
  $routeProvider
    .when("/", {templateUrl: "partials/home.html"})
   
}]);


