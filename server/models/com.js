'use strict';

function Com(){
}

Object.defineProperty(Com, 'collection', {
  get: function(){return global.mongodb.collection('com');}
});

module.exports = Com;

