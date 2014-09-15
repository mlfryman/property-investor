/* jshint unused:false, camelcase:false */

'use strict';

var request = require('request'),
    _       = require('underscore');

function Permit(){
}

Object.defineProperty(Permit, 'collection', {
  get: function(){return global.mongodb.collection('permits');}
});

Permit.findAllWithin2Miles = function(latLng, cb){
  var url = 'http://data.nashville.gov/resource/3h5w-q8b7.json?$where=within_circle(mapped_location, ' + latLng.lat + ', '+ latLng.lng +', 3220)';

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
      var icon = getIconOrColor('I', type);
      markers.push({lat: parseFloat(p.mapped_location.latitude), lng: parseFloat(p.mapped_location.longitude), name: p.permit_type_description, icon:icon});
    });
    chartObj.value = permits.length;
    chartObj.label = ((permits.length / total) * 100).toFixed(1) + '% ' + permits[0].permit_type_description;
    chartObj.color = getIconOrColor('C', type);
    chartObj.highlight = getIconOrColor('C', type);
    chartData.push(chartObj);
  });

  return {chartData:chartData, markers:markers};
}

function getIconOrColor(type, permit){
  if(permit === 'CADM'){
    // "CADM, BUILDING DEMOLITION PERMIT"
    switch(type){
      case 'I':
        return '/assets/img/markers/demolition.png';
      default:
        return '#FF4136';
    }
  }else if(permit === 'CARA' || permit === 'CARN'){
    // New residential construction
    switch(type){
      case 'I':
        return '/assets/img/markers/new-res.png';
      default:
        return '#01FF70';
    }
  }else if(permit === 'CARR' || permit === 'CARK' || permit === 'CART' || permit === 'CARP' || permit === 'CARJ' || permit === 'CARL' || permit === 'CARH'){
    // renovation of existing residential property
    switch(type){
      case 'I':
        return '/assets/img/markers/ren-res.png';
      default:
        return '#39CCCC';
    }
  }else if(permit === 'CACN'){
    // New Comercial Construction
    switch(type){
      case 'I':
        return '/assets/img/markers/new-com.png';
      default:
        return '#FFDC00';
    }
  }else if(permit === 'CACR' || permit === 'CACA' ||permit === 'CACT' || permit === 'CACK' ||permit === 'CACF' || permit === 'CACL' || permit === 'CACH'){
    // renovation of existing comercial property
    switch(type){
      case 'I':
        return '/assets/img/markers/ren-com.png';
      default:
        return '#FF851B';
    }
  }else{
    // Misc Construction permits
    switch(type){
      case 'I':
        return '/assets/img/markers/misc.png';
      default:
        return '#DDDDDD';
    }
  }
}
