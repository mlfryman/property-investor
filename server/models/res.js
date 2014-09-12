'use strict';

function Res(){
}

Object.defineProperty(Res, 'collection', {
    get: function(){return global.mongodb.collection('res');}
});

module.exports = Res;

