'use strict';

var Value = require('../models/value');


exports.getData = function(req, res){
  Value.getData(req.query, function(zest, demo){
    res.send({zestimate: zest, demographics: demo});
  });
};
