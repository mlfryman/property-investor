'use strict';

function Value(){
}

Object.defineProperty(Value, 'collection', {
    get: function(){return global.mongodb.collection('value');}
});

module.exports = Value;
