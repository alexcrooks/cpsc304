'use strict';

var _ = require('underscore');

exports.routes = {
  get: {
    method: 'get',
    path: '/:order_id/:upc'
  },
  del: {
    method: 'delete',
    path: '/:order_id/:upc'
  },
  update: {
    method: 'put',
    path: '/:order_id/:upc'
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
  var order_id = this.params.order_id;
  var upc = this.params.upc;
  var result = yield this.model().get(order_id, upc);
  this.body = {items: result};
};

exports.update = function *() {
  var order_id = this.params.order_id;
  var upc = this.params.upc;
  var data = this.request.body;
  var result = yield this.model().update(order_id, upc, data);
  this.body = {items: result};
};

exports.del = function *() {
  var order_id = this.params.order_id; 
  var upc = this.params.upc;
  var result = yield this.model().delete(order_id, upc); 
  this.body = {items: result};
};