'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');

module.exports = {
  insert: function *(data) {
    var insertId = yield db.insert('return', data);
    return yield db.get('return', {upc: insertId});
  },

  update: function *(id, data) {
    delete data.upc;
    var selector = {upc: id};
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
