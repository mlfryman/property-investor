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
  request(url1, function(err1, response1, searchResults){
    request(url2, function(err2,response2, demographics){
      searchResults = parser.toJson(searchResults);
      demographics  = parser.toJson(demographics);
      cb(searchResults, demographics);
    });
  });
};



module.exports = Value;
