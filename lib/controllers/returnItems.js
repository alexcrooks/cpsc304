'use strict';

var _ = require('underscore');

exports.routes = {
  get: {
    method: 'get',
    path: '/:return_id/:upc'
  },
  del: {
    method: 'delete',
    path: '/:return_id/:upc'
  },
  update: {
    method: 'put',
    path: '/:return_id/:upc'
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
  var id = this.params.return_id;
  var upc = this.params.upc;
  var result = yield this.model().get(return_id, upc);
  this.body = {items: result};
};

exports.update = function *() {
  var id = this.params.return_id;
  var upc = this.params.upc;
  var data = this.request.body;
  var result = yield this.model().update(id, upc, data);
  this.body = {items: result};
};

exports.del = function *() {
  var id = this.params.return_id;
  var upc = this.params.upc;
  var result = yield this.model().delete(id, upc); 
  this.body = {items: result};
};