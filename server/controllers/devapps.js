'use strict';

var DevApp = require('../models/devapp');

exports.index = function(req, res){
  DevApp.findAllWithin10Miles(req.query, function(err, devApps){
    res.send(devApps);
  });
};

