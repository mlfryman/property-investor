/* jshint expr:true */
/* global describe, it */

'use strict';

var expect    = require('chai').expect,
    Value     = require('../../models/value');

describe('Value', function(){

  describe('constructor', function(){
    it('should create a new Value object', function(){
      var v = new Value();
      expect(v).to.be.instanceof(Value);
    });
  });

  describe('.getData', function(){
    it('should get the Address, City, Zipcode and State data', function(done){
      Value.getData({address:'908 Archer St', city:'Nashville', state:'TN', zip:'37203'}, function(search, home){
        expect(search).to.be.ok;
        expect(home).to.be.ok;
        done();
      });
    });
  });
});

