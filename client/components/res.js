// Residential Development Factory

(function(){
  'use strict';

  angular.module('prop')
  .factory('Permit', ['$http', function($http){

    function getPermits(lat, lng){
      return $http.get('/permits?lat=' + lat + '&lng=' + lng);
    }

    return {getPermits:getPermits};
  }]);
})();
