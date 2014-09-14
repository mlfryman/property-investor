'use strict';

var Value = require('../models/value');


exports.getData = function(req, res){
  Value.getData(req.query, function(zest, demoCity, demoNation){
    res.send({zestimate: zest, demoCity: demoCity, demoNation: demoNation});
  });
};
