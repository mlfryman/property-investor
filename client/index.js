// Controllers = Home

(function(){
  'use strict';

  angular.module('prop', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/value', {templateUrl:'/views/value/value.html', controller:'ValueCtrl'})
    .otherwise({redirectTo:'/'});
  }]);
})();

