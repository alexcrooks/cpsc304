'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');

module.exports = {
  insert: function *(data) {
    var insertId = yield db.insert('order_item', data);
    var selector = [{order_id: data.order_id}, {upc: data.upc}];
    var customSelector = '? AND ?';
    return yield db.get('order_item', selector, customSelector);
  },

  update: function *(id, upc, data) {
    delete data.order_id;  
    var selector = [{order_id: id}, {upc: upc}];  
    var customSelector = '? AND ?';
    var updateResult = yield db.update('order_item', selector, data, customSelector);
    return updateResult ? yield db.get('order_item', selector) : null;

  },

  delete: function *(id, upc) {
    var customSelector = '? AND ?';
    var selector = [{order_id: parseInt(id)}, {upc: parseInt(upc)}];
    return yield db.delete('order_item', selector, customSelector);
  },

  get: function *(id, upc) {
    var customSelector = '? AND ?';
    return yield db.get('order_item', [{order_id: parseInt(id)}, {upc: parseInt(upc)}], customSelector);
  },

  getMany: function *() {
    return yield db.getMany('order_item');
  }
};