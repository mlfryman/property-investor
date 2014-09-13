// Commercial Development Factory

(function(){
  'use strict';

  angular.module('prop')
  .factory('DevApp', ['$http', function($http){
    function getApps(lat, lng){
      return $http.get('/devapps?lat=' + lat + '&lng=' + lng);
    }

    return {getApps:getApps};
  }]);
})();

