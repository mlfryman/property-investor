/* jshint unused:false, camelcase:false */

'use strict';

var request = require('request'),
    _       = require('underscore');

function Permit(){
}

Object.defineProperty(Permit, 'collection', {
  get: function(){return global.mongodb.collection('permits');}
});

Permit.findAllWithin10Miles = function(latLng, cb){
  var url = 'http://data.nashville.gov/resource/3h5w-q8b7.json?$where=within_circle(mapped_location, ' + latLng.lat + ', '+ latLng.lng +', 16094)';

  request(url, function(err, response, body){
    body = JSON.parse(body);
    // per_ty
    // permit_type_description
    // mapped_location
    var data = massageData(body);
    cb(err, data);
  });

};


module.exports = Permit;

// HELPER FUNCTIONS
function massageData(rawData){
  var types       = _.pluck(rawData, 'per_ty'),
      finishedObj = {},
      markers     = [],
      chartData   = [],
      total       = rawData.length;

  types = _.uniq(types);

  types.forEach(function(type){
    var permits = _.where(rawData, {per_ty: type}),
        chartObj = {};
    permits.forEach(function(p){
      var icon = 'replace/with/dynamic/icon.png';
      markers.push({lat: p.mapped_location.latitude, lng: p.mapped_location.longitude, name: p.permit_type_description, icon:icon});
    });
    chartObj.value = permits.length;
    chartObj.label = ((permits.length / total) * 100).toFixed(1) + '% ' + permits[0].permit_type_description;
    chartObj.color = '#0074D9';
    chartObj.highlight = '#7FDBFF';
    chartData.push(chartObj);
  });

  return {markers:markers, chartData:chartData};

}
