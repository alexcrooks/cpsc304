'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');

module.exports = {
  insert: function *(data) {
    var insertId = yield db.insert('order', data);
    return yield db.get('order', {id: insertId});
  },

  update: function *(id, data) {
    delete data.upc;
    var selector = {upc: id};
    var updateResult = yield db.update('order', selector, data);
    return updateResult ? yield db.get('order', selector) : null;
  },

  delete: function *(id) {
    return yield db.delete('order', {id: parseInt(id)});
  },

  get: function *(id) {
    return yield db.get('order', {id: parseInt(id)});
  },

  getMany: function *(id) {
    return yield db.getMany('order');
  },

  dailySales: function *(date) {
    var query = 'SELECT ...... FROM item WHERE .... ' //join order with item
    var params = [];
    var result = yield db.query(query, params);
    return result;
  }
};
