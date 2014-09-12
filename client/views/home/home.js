(function(){
  'use strict';

  angular.module('prop')
  .controller('HomeCtrl', ['$scope', 'Home', 'Permit', 'DevApp', 'Value', function($scope, Home, Permit, DevApp, Value){
    $scope.title = 'Home';

  }]);
})();
