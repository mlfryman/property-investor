'use strict';

var request = require('request');

function Permit(){
}

Object.defineProperty(Permit, 'collection', {
  get: function(){return global.mongodb.collection('permits');}
});

Permit.findAllWithin10Miles = function(latLng, cb){
  var url = 'http://data.nashville.gov/resource/3h5w-q8b7.json?$where=within_circle(mapped_location, ' + latLng.lat + ', '+ latLng.lng +', 16094)';

  request(url, function(err, response, body){
    body = JSON.parse(body);
    cb(err, body);
  });

};


module.exports = Permit;
