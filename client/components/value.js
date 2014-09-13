// Home Value Comparisons Factory

(function(){
  'use strict';

  angular.module('prop')
  .factory('Value', ['$http', function($http){

    function getData(address, city, state, zip){
      //One small step for Angular, one giant query string for Node-kind.
      return $http.get('/value?zip='+zip+'&city='+city+'&state='+state+'&address='+address);
    }


    return {getData: getData};
  }]);
})();
