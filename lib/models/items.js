'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');

module.exports = {
  insert: function *(data) {
    var insertId = yield db.insert('item', data);
    return yield db.get('item', {upc: insertId});
  },

  update: function *(id, data) {
    delete data.upc;
    var selector = {upc: id};
    var updateResult = yield db.update('item', selector, data);
    return updateResult ? yield db.get('item', selector) : null;
  },

  delete: function *(id) {
    return yield db.delete('item', {upc: parseInt(id)});
  },

  get: function *(id) {
    return yield db.get('item', {upc: parseInt(id)});
  },

  getMany: function *(id) {
    return yield db.getMany('item');
  }
};
