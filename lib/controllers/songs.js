'use strict';

var _ = require('underscore');

exports.routes = {
  get: {
    method: 'get',
    path: '/:upc/:title'
  },
  del: {
    method: 'delete',
    path: '/:upc/:title'
  },
  update: {
    method: 'put',
    path: '/:upc/:title'
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
  var upc = this.params.upc;
  var title = this.params.title;
  var result = yield this.model().get(upc, title);
  this.body = {items: result};
};

exports.update = function *() {
  var upc = this.params.upc;
  var title = this.params.title;
  var data = this.request.body;
  var result = yield this.model().update(upc, title, data);
  this.body = {items: result};
};

exports.del = function *() {
  var upc = this.params.upc; 
  var title = this.params.title;
  var result = yield this.model().delete(upc, title); 
  this.body = {items: result};
};