/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */

 var app = angular.module('tutorialWebApp', [
  'ngRoute','movie-directives'
]);

/*app.config( function ($urlRouterProvider, $httpProvider) {
    console.log("came to app.config function");
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['X-REST-CORS'] = 'Yes';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
);*/


/**
 * Configure the Routes
 */
app.config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
    console.log($httpProvider);
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['X-REST-CORS'] = 'Yes';
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*'; 
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});