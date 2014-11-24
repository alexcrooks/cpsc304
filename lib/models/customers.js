'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');

module.exports = {
  insert: function *(data) {
    var insertId = yield db.insert('customer', data);
    return yield db.get('customer', {id: insertId});
  },

  update: function *(id, data) {
    delete data.id;
    var selector = {id: id};
    var updateResult = yield db.update('customer', selector, data);
    return updateResult ? yield db.get('customer', selector) : null;
  },

  delete: function *(id) {
    return yield db.delete('customer', {id: parseInt(id)});
  },

  get: function *(id) {
    return yield db.get('customer', {id: parseInt(id)});
  },

  getMany: function *() {
    return yield db.getMany('customer');
  }
};
