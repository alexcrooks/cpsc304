'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');

module.exports = {
  insert: function *(data) {
console.log(data);
    var insertId = yield db.insert('return', data);
    console.log(insertId);
    return yield db.get('return', {id: parseInt(insertId)});
  },

  update: function *(id, data) {
    delete data.upc;
    var selector = {id: id};
    var updateResult = yield db.update('return', selector, data);
    return updateResult ? yield db.get('return', selector) : null;
  },

  delete: function *(id) {
    return yield db.delete('return', {id: parseInt(id)});
  },

  get: function *(id) {
    return yield db.get('return', {id: parseInt(id)});
  },

  getMany: function *(id) {
    return yield db.getMany('return');
  },

};
