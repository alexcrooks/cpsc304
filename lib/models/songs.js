'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');

module.exports = {
  insert: function *(data) {
    var insertId = yield db.insert('has_song', data);
    var selector = [{upc: data.upc}, {title: data.title}];
    var customSelector = '? AND ?';
    return yield db.get('has_song', selector, customSelector);
  },

  update: function *(id, title, data) {
    delete data.upc;  
    var selector = [{upc: id}, {title: title}];  
    var customSelector = '? AND ?';
    var updateResult = yield db.update('has_song', selector, data, customSelector);
    return updateResult ? yield db.get('has_song', selector) : null;

  },

  delete: function *(id, title) {
    var customSelector = '? AND ?';
    var selector = [{upc: parseInt(id)}, {title: title}];
    return yield db.delete('has_song', selector, customSelector);
  },

  get: function *(id, title) {
    var customSelector = '? AND ?';
    return yield db.get('has_song', [{upc: parseInt(id)}, {title: title}], customSelector);
  },

  getMany: function *() {
    return yield db.getMany('has_song');
  }
};