'use strict';

var request = require('request');

function DevApp(){
}

Object.defineProperty(DevApp, 'collection', {
  get: function(){return global.mongodb.collection('devapps');}
});

DevApp.findAllWithin10Miles = function(latLng, cb){
  var url = 'http://data.nashville.gov/resource/mjrr-dybz.json?$where=within_circle(mapped_location, ' + latLng.lat + ', '+ latLng.lng +', 16094)&$order=mpc_meeting_date DESC';

  request(url, function(err, response, body){
    body = JSON.parse(body);
    cb(err, body);
  });

};


module.exports = DevApp;
