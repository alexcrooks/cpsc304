'use strict';

var _ = require('underscore');

exports.routes = {
  dailySales: {
    method: 'get',
    path: '/daily-sales/:date'
  },

  topItems: {
    method: 'get',
    path: '/top-items/:date/:limit'
  }
};

exports.index = function *() {
  var result = yield this.model().getMany();
  this.body = {items: result};
};

exports.create = function *() {
  var data = this.request.body;
  var result = yield this.model().insert(data);
  this.body = {items: result};
};

exports.get = function *() {
  var id = this.params.id;
  var result = yield this.model().get(id);
  this.body = {items: result};
};

exports.update = function *() {
  var id = this.params.id;
  var data = this.request.body;
  var result = yield this.model().update(id, data);
  this.body = {items: result};
};

exports.del = function *() {
  var id = this.params.id; 
  var result = yield this.model().delete(id); 
  this.body = {items: result};
};

exports.dailySales = function *() {
  var date = this.params.date;
  var result = yield this.model().dailySales(date);
  this.body = {report: result || []};
};

exports.topItems = function *() {
  var date = this.params.date;
  var limit = parseInt(this.params.limit);
  var result = yield this.model().topItems(date, limit);
  this.body = {report: result || []};
};
