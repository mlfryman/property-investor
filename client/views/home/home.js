/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('prop')
  .controller('HomeCtrl', ['$scope', 'Home', function($scope, Home){
    $scope.title = 'Property Investor';

    // DELETE ME! - this is for testing only.
    $scope.location = {};
    $scope.locations = [];
    $scope.search = function(){
      $scope.locations.push($scope.location);
      $scope.location = {};
    };
    // END DELETE

// Last brackets
  }]);
})();
