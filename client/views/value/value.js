/* global Chart */

(function(){
  'use strict';

  angular.module('prop')
  .controller('ValueCtrl', ['$scope', 'Value', function($scope, Value){
    $scope.title = 'Value successfully pulled in!';


    //Dave note: I am assuming these parameters are coming with ng model, can be changed to be an object instead later.
    Value.getData('908 Archer St', 'Nashville', 'TN', '37203').then(function(response){
      //will add data to this function later
      createBar(response.data.zestimate, response.data.demographics);
    });

    function createBar(zest, demo){
      var data = {
        labels: ['Home', 'City', 'Nation'],
        datasets: [
          {
            fillColor: 'rgba(220,220,220,0.5)',
            strokeColor: 'rgba(220,220,220,0.8)',
            highlightFill: 'rgba(220,220,220,0.75)',
            highlightStroke: 'rgba(220,220,220,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            fillColor: 'rgba(151,187,205,0.5)',
            strokeColor: 'rgba(151,187,205,0.8)',
            highlightFill: 'rgba(151,187,205,0.75)',
            highlightStroke: 'rgba(151,187,205,1)',
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      },
      ctx = document.getElementById('chart').getContext('2d');
      new Chart(ctx).Bar(data);
    }






  }]);
})();

