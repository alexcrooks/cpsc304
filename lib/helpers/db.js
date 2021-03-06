'use strict';

var mysql = require('mysql');
var fs = require('fs');
var _ = require('underscore');
var config = require('../../config.js').mysql;
var connection;

module.exports = {
  insert: function *(type, data) {
    data = this.sanitizeData(data);
    var query = 'INSERT INTO ?? SET ?';
    var params = [type, data];
    var result = yield this.query(query, params);
    return result.insertId;
  },

  insertMany: function *(type, items) {
    var insertIds = [];

    for (var i = 0; i < items.length; i++) {
      insertIds.push(yield this.insert(type, items[i]));
    }
    return insertIds;
  },

  update: function *(type, selector, modifier, customSelector) {
    modifier = this.sanitizeData(modifier);
    selector = _.isArray(selector) ? selector : [selector];
    var query = 'UPDATE ?? SET ? WHERE ' + (customSelector || '?');
    var params = _.union([type, modifier], selector);
    return yield this.query(query, params);
  },

  delete: function *(type, selector, customSelector) {
    selector = _.isArray(selector) ? selector : [selector];
    var query = 'DELETE FROM ?? WHERE ' + (customSelector || '?');
    var params = _.union([type], selector);
    var result = yield this.query(query, params);
    return null;
  },

  get: function *(type, selector, customSelector) {
    selector = _.isArray(selector) ? selector : [selector];
    var query = 'SELECT * FROM ?? WHERE ' + (customSelector || '?');
    var params = _.union([type], selector);
    var result = yield this.query(query, params);
    return result.length ? result[0] : null;
  },

  getWithSearch: function *(type, selector, customSelector) {
    selector = _.isArray(selector) ? selector : [selector];                     
    var query = 'SELECT * FROM ?? WHERE ' + (customSelector || '?');            
    var params = _.union([type], selector);                                     
    var result = yield this.query(query, params);                               
    return result.length ? result : [];   
  },

  getMany: function *(type) {
    var query = 'SELECT * FROM ??';
    var params = [type];
    var result = yield this.query(query, params);
    return result.length ? result : [];
  },

  query: function (query, bindings) {
    return function (callback) {
      var cb = function (err, result) {
        if (err) {
          return callback(err); 
        }
        return callback(null, result);
      }; 
      if (bindings) {
        connection.query(query, bindings, cb); 
      } else {
        connection.query(query, cb);
      }
    };
  },

  sanitizeData: function (object) {
    var self = this;
    var newObject = {};
    _.each(object, function (value, index) {
      newObject[self.camelToUnder(index)] = value;
    });
    return newObject;
  },

  camelToUnder: function (string) {
    return string.replace(/\W+/g, '_').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
  },

  getConnection: function () {
    return connection;
  },

  connect: function (callback) {
    connection = mysql.createConnection(this.getSettings());
    connection.connect(function (err) {
      if (err) {
        throw new Error(err);
      }
      return callback(null, connection);
    });
  },

  getSettings: function () {
    var settings = {
      multipleStatements: true
    };
    if (config.host) {
      settings.host = config.host;
    }
    if (config.port) {
      settings.port = config.port;
    }
    if (config.db) {
      settings.database = config.db;
    }
    if (config.user) {
      settings.user = config.user;
    }
    if (config.pass) {
      settings.password = config.pass;
    }
    return settings;
  },

  disconnect: function (callback) {
    connection.end(function (err) {
      if (err) {
        throw new Error(err);
      }
      callback();
    });
  },

  initialize: function () {
    fs.readFile(__dirname + '/../../data/dump.sql', 'utf8', function (err, data) {
      if (err) {
        throw new Error(err);
      }
      connection.query(data, function (err, result) {
        if (err) {
          throw new Error(err);
        }
        console.log('Built database from data/dump.sql');
      });
    });
  }
};
