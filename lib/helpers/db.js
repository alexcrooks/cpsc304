'use strict';

var mysql = require('mysql');
var fs = require('fs');
var _ = require('underscore');
var config = require('../../config.js').mysql;
var connection;

module.exports = {
  insert: function *(type, data) {
    var query = 'INSERT INTO ?? SET ?';
    var params = [type, data];
    var result = yield this.query(query, params);
    return result.insertId;
  },

  update: function *(type, selector, modifier) {
    var query = 'UPDATE ?? SET ? WHERE ?';
    var params = [type, modifier, selector];
    return yield this.query(query, params);
  },

  delete: function *(type, selector) {
    var query = 'DELETE FROM ?? WHERE ?';
    var params = [type, selector];
    var result = yield this.query(query, params);
    return null;
  },

  get: function *(type, selector, callback) {
    var query = 'SELECT * FROM ?? WHERE ?';
    var params = [type, selector];
    var result = yield this.query(query, params);
    return result.length ? result[0] : null;
  },

  getMany: function *(type, callback) {
    var query = 'SELECT * FROM ??';
    var params = [type];
    var result = yield this.query(query, params);
    return result.length ? result : [];
  },

  query: function (query, bindings) {
    return function (callback) {
      connection.query(query, bindings, function (err, result) {
        if (err) {
          return callback(err); 
        }
        return callback(null, result);
      }); 
    };
  },

  getConnection: function () {
    return connection;
  },

  connect: function (callback) {
    connection = mysql.createConnection({
      host: config.host,
      port: config.port,
      database: config.db,
      user: config.user,
      password: config.pass,
      multipleStatements: true
    });
    connection.connect(function (err) {
      if (err) {
        throw new Error(err);
      }
      return callback(null, connection);
    });
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
