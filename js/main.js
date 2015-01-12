var app = angular.module('googleBooks', [
  'ngRoute','books','ngFacebook'
]);

var base_url = window.location.origin;
app.config(['$facebookProvider','$routeProvider','$httpProvider', function ($facebookProvider, $routeProvider, $httpProvider) {
 	$facebookProvider.setAppId('337747966330689').setPermissions(['email','user_friends','user_actions.books', 'public_profile']);
	$routeProvider
    .when("/", {templateUrl: "partials/home.html"})
    .when("/book", {templateUrl: "partials/book.html", controller: "bookController"})
  }]);
  
app.run(['$rootScope', '$window', function($rootScope, $window) {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    $rootScope.$on('fb.load', function() {
      $window.dispatchEvent(new Event('fb.load'));
    });
  }]);

