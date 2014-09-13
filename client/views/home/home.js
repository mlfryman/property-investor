/* jshint unused:false, camelcase:false */
/* global google */

(function(){
  'use strict';

  angular.module('prop')
  .controller('HomeCtrl', ['$scope', 'Home', 'Permit', 'DevApp', 'Value', function($scope, Home, Permit, DevApp, Value){
    $scope.title = 'Home';

    $scope.searchPermits = function(){
      var address = $scope.loc.street + ', ' + $scope.loc.city + ', ' + $scope.loc.state + ' ' + $scope.loc.zip;
      geocode(address, function(name, lat, lng){
        $scope.loc.name = name;
        $scope.loc.lat = lat;
        $scope.loc.lng = lng;
        Permit.getPermits(lat, lng).then(function(res){
          $scope.permits = res.data;
        });
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
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP, icon: icon});
  }

})();
