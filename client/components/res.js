// Residential Development Factory

(function(){
  'use strict';

  angular.module('prop')
  .factory('Permit', ['$http', function($http){
    function getPermits(lat, lng){
      var url = 'http://data.nashville.gov/resource/3h5w-q8b7.json?$where=within_circle(mapped_location, ' + lat + ', '+ lng +', 16094)';

      return $http.get(url);
    }

    return {getPermits:getPermits};
  }]);
})();
