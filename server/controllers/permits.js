'use strict';

var Permit = require('../models/permit');

exports.index = function(req, res){
  Permit.findAllWithin10Miles(req.query, function(err, permits){
    res.send(permits);
  });
};

