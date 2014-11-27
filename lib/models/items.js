'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');

module.exports = {
  insert: function *(data) {
    var addHasSongs = _.isArray(data.hasSongs) && data.hasSongs.length > 0;
    var addLeadSingers = _.isArray(data.leadSingers) && data.leadSingers.length > 0;
    var hasSongs = data.hasSongs;
    var leadSingers = data.leadSingers;
    delete data.hasSongs;
    delete data.leadSingers;
    yield db.query('START TRANSACTION');
    var insertId = yield db.insert('item', data);

    if (addHasSongs) {
      _.each(hasSongs, function (hasSong) {
        hasSong.upc = insertId;
      });
      yield db.insertMany('has_song', hasSongs);
    }
    if (addLeadSingers) {
      _.each(leadSingers, function (leadSinger) {
        leadSinger.upc = insertId;
      });
      yield db.insertMany('lead_singer', leadSingers);
    }
    yield db.query('COMMIT');
    var item = yield db.get('item', {upc: insertId});
    if (addHasSongs) {
      item.hasSongs = yield db.getWithSearch('has_song', {upc: insertId});
    }
    if (addLeadSingers) {
      item.leadSingers = yield db.getWithSearch('lead_singer', {upc: insertId});
    }
    return item;
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
  },

  dailySales: function *(date) {
    var query = 'SELECT ...... FROM item WHERE .... ' //join order with item
    var params = [];
    var result = yield db.query(query, params);
    return result;
  }
};
