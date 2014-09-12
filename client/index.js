// Controllers = Home, Value, Res[idential], Com[mercial]

(function(){
  'use strict';

  angular.module('prop', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/', {templateUrl:'/views/value/value.html', controller:'ValueCtrl'})
    .when('/', {templateUrl:'/views/res/res.html', controller:'ResCtrl'})
    .when('/', {templateUrl:'/views/com/com.html', controller:'ComCtrl'})
    .otherwise({redirectTo:'/'});
  }]);
})();

