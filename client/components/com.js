// Commercial Development Factory

(function(){
  'use strict';

  angular.module('prop')
  .factory('DevApp', ['$http', function($http){
    function getApps(lat, lng){
      var url = 'http://data.nashville.gov/resource/mjrr-dybz.json?$where=within_circle(mapped_location, ' + lat + ', '+ lng +', 16094)&$order=mpc_meeting_date DESC';

      return $http.get(url);
    }

    return {getApps:getApps};
  }]);
})();

