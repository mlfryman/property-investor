'use strict';

var Permit = require('../models/permit');

exports.index = function(req, res){
  Permit.findAllWithin2Miles(req.query, function(err, permits){
    res.send(permits);
  });
};

