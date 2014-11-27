'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');

module.exports = {
  insert: function *(data) {
    var insertId = yield db.insert('return_item', data);
    var selector = [{return_id: parseInt(data.returnId)}, {upc: parseInt(data.upc)}];
    var customSelector = '? AND ?';
    return yield db.get('return_item', selector, customSelector);
  },

  update: function *(id, upc, data) {
    delete data.upc;  
    var selector = [{return_id: parseInt(id)}, {upc: parseInt(upc)}];  
    var customSelector = '? AND ?';
    var updateResult = yield db.update('return_item', selector, data, customSelector);
    return updateResult ? yield db.get('return_item', selector) : null;

  },

  delete: function *(id, upc) {
    var customSelector = '? AND ?';
    var selector = [{return_id: parseInt(id)}, {upc: parseInt(upc)}];
    return yield db.delete('return_item', selector, customSelector);
  },

  get: function *(id, upc) {
    var customSelector = '? AND ?';
    return yield db.get('return_item', [{return_id: parseInt(id)}, {upc: parseInt(upc)}], customSelector);
  },

  getMany: function *() {
    return yield db.getMany('return_item');
  }
};