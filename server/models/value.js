'use strict';

var request = require('request'),
    parser  = require('xml2json');

function Value(){
}

Object.defineProperty(Value, 'collection', {
  get: function(){return global.mongodb.collection('value');}
});

Value.getData = function(query, cb){
  var zwsid  = 'X1-ZWz1b3xddzrk0b_2doog',
      url1   = 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id='+zwsid+'&address='+query.address+'&citystatezip='+query.city+' '+query.state,
      url2   = 'http://www.zillow.com/webservice/GetDemographics.htm?zws-id='+zwsid+'&state='+query.state+'&city='+query.city;
  request(url1, function(err1,response1,zestimate){
    request(url2, function(err2,response2,demographics){
      //conversion to JSON
      zestimate = JSON.parse(parser.toJson(zestimate));
      demographics  = JSON.parse(parser.toJson(demographics));

      //error code and data massage for zestimate
      var zestCode = zestimate['SearchResults:searchresults'].message.code,
          zest = {};
      if(zestCode === 508){
        zest = 0;
      }
      else{
        zest = zestimate['SearchResults:searchresults'].response.results.result.zestimate.amount.$t;
      }

      //data massage
      var demoCity = demographics['Demographics:demographics'].response.pages.page[0].tables.table.data.attribute[1].values.city.value.$t,
          demoNation = demographics['Demographics:demographics'].response.pages.page[0].tables.table.data.attribute[1].values.nation.value.$t;
      cb(zest, demoCity, demoNation);

    });
  });
};



module.exports = Value;
