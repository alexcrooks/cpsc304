'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');

module.exports = {
  insert: function *(data) {
    var insertId = yield db.insert('lead_singer', data);
    var selector = [{upc: data.upc}, {name: data.name}];
    var customSelector = '? AND ?';
    return yield db.get('lead_singer', selector, customSelector);
  },

  update: function *(id, name, data) {
    delete data.upc;
    var selector = [{upc: id}, {name: name}];
    var customSelector = '? AND ?';
    var updateResult = yield db.update('lead_singer', selector, data, customSelector);
    return updateResult ? yield db.get('lead_singer', selector) : null;

  },

  delete: function *(id, name) {
    var customSelector = '? AND ?';
    var selector = [{upc: parseInt(id)}, {name: name}];
    return yield db.delete('lead_singer', selector, customSelector);
  },

  get: function *(id, name) {
    var customSelector = '? AND ?';
    return yield db.get('lead_singer', [{upc: parseInt(id)}, {name: name}], customSelector);
  },

  getMany: function *() {
    return yield db.getMany('lead_singer');
  }
};