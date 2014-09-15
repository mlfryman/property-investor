/* jshint unused:false, camelcase:false */

'use strict';

var request = require('request'),
    _       = require('underscore');

function DevApp(){
}

Object.defineProperty(DevApp, 'collection', {
  get: function(){return global.mongodb.collection('devapps');}
});

DevApp.findAllWithin10Miles = function(latLng, cb){
  var url = 'http://data.nashville.gov/resource/mjrr-dybz.json?$where=within_circle(mapped_location, ' + latLng.lat + ', '+ latLng.lng +', 3220)&$order=mpc_meeting_date DESC';

  request(url, function(err, response, body){
    body = JSON.parse(body);
    var data = massageData(body);
    cb(err, data);
  });

};


module.exports = DevApp;

// HELPER FUNCTIONS
function massageData(data){
  // "status": "Complete"
  var activeApps = _.reject(data, function(o){return o.status === 'Complete';}),
      obj        = {},
      now        = new Date();
  obj.markers    = [];
  obj.tableRows  = [];

  activeApps.forEach(function(app){
    var date = new Date(app.mpc_meeting_date);
    if(now.valueOf() > date.valueOf()){return;}
    var row = {project:app.project_name, meetingDate: new Date(app.mpc_meeting_date)},
        marker = {lat:parseFloat(app.mapped_location.latitude), lng:parseFloat(app.mapped_location.longitude), name: row.project, icon: '/assets/img/markers/new-com.png'};
    obj.tableRows.push(row);
    obj.markers.push(marker);
  });

  return obj;
}
