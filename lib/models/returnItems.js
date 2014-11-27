'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');

module.exports = {
  insert: function *(data) {
    yield db.query('START TRANSACTION');
    var insertId = yield db.insert('return_item', data);
    var item = yield this.changeItemQuantity(data);
    yield db.query('COMMIT');
    var selector = [{return_id: parseInt(data.returnId)}, {upc: parseInt(data.upc)}];
    var customSelector = '? AND ?';
    var returnItem = yield db.get('return_item', selector, customSelector);
    returnItem.items = [item];
    return returnItem;
  },

  changeItemQuantity: function *(data) {
    yield db.query('UPDATE item SET stock = (stock + ?) WHERE upc = ?', [data.quantity, data.upc]);
    return yield db.get('item', {upc: data.upc}); 
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
