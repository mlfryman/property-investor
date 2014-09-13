(function(){
  'use strict';

  angular.module('prop')
  .controller('ValueCtrl', ['$scope', 'Value', function($scope, Value){
    $scope.title = 'Value successfully pulled in!';


    //Dave note: I am assuming these parameters are coming with ng model, can be changed to be an object instead later.
    Value.getData('908 Archer St', 'Nashville', 'TN', '37203').then(function(response){
      $scope.zestimate = response.data.zestimate;
      $scope.demographics = response.data.demographics;
    });

  }]);
})();

