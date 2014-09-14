/* jshint unused:false, camelcase:false */
/* global google, Chart */

(function(){
  'use strict';

  angular.module('prop')
  .controller('HomeCtrl', ['$scope', 'Home', 'Permit', 'DevApp', 'Value', function($scope, Home, Permit, DevApp, Value){
    $scope.title = 'Home';

    angular.element(document).ready(function(){
      $scope.map = cartographer('cityMap', 35.788399, -86.67444089999998, 5);
    });
    $scope.markers = [];

    $scope.loc = {street:'915 Glendale Ln', city:'Nashville', state:'TN', zip:'37204'};

    $scope.searchPermits = function(){
      var address = $scope.loc.street + ', ' + $scope.loc.city + ', ' + $scope.loc.state + ' ' + $scope.loc.zip;
      geocode(address, function(name, lat, lng){
        Permit.getPermits(lat, lng).then(function(res){
          $scope.permits = res.data;
        });
        $scope.loc.name = name;
        $scope.loc.lat = lat;
        $scope.loc.lng = lng;
        $scope.map.panTo(new google.maps.LatLng(lat, lng));
        $scope.map.setZoom(12);
        $scope.markers.push(addMarker($scope.map, lat, lng, name, '/assets/img/main-icon.png'));
      });
    };

    $scope.searchApps = function(){
      var address = $scope.loc.street + ', ' + $scope.loc.city + ', ' + $scope.loc.state + ' ' + $scope.loc.zip;
      geocode(address, function(name, lat, lng){
        $scope.loc.name = name;
        $scope.loc.lat = lat;
        $scope.loc.lng = lng;
        DevApp.getApps(lat, lng).then(function(res){
          $scope.devApps = res.data;
        });
      });
    };

    //Zestimate and Demographic Median Sale Price/Bar Graph
    //Size of canvas handled in createBar()
    $scope.getMedian = function(){
      Value.getData($scope.loc.street, $scope.loc.city, $scope.loc.state, $scope.loc.zip).then(function(response){
        createBar(response.data.zestimate, response.data.demoCity, response.data.demoNation);
      });
    };

  }]);

  function geocode(address, cb){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:address}, function(results, status){
      //console.log('results', results);
      var name = results[0].formatted_address,
          lat  = results[0].geometry.location.lat(),
          lng  = results[0].geometry.location.lng();
      cb(name, lat, lng);
    });
  }

  function cartographer(cssId, lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP},
        map = new google.maps.Map(document.getElementById(cssId), mapOptions);
    return map;
  }

  function addMarker(map, lat, lng, name, icon){
    var latLng = new google.maps.LatLng(lat, lng);
    return new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP, icon: icon});
  }

  function createBar(zest, demoCity, demoNation){
    var data = {
      labels: ['Home', 'City', 'Nation'],
      datasets: [
        {
          fillColor: 'rgba(0, 0, 0, 1)',
          strokeColor: 'rgba(0, 0, 0, 1.0)',
          highlightFill: 'rgba(220,220,220,1)',
          highlightStroke: 'rgba(220,220,220,1)',
          data: [zest, demoCity, demoNation, 0]
        }
      ]
    },
    ctx = document.getElementById('chart').getContext('2d');
    ctx.canvas.width = 1000;
    ctx.canvas.height = 400;
    new Chart(ctx).Bar(data);
  }

})();
