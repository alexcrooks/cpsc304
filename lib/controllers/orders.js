'use strict';

var _ = require('underscore');

exports.routes = {
  get: {
    method: 'get',
    path: '/:id/'
  },
  del: {
    method: 'delete',
    path: '/:id/'
  },
  update: {
    method: 'put',
    path: '/:id/'
  }  //start here
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
  var name = this.params.name;
  var result = yield this.model().get(upc, name);
  this.body = {items: result};
};

exports.update = function *() {
  var upc = this.params.upc;
  var data = this.request.body;
  var name = this.params.name;
  var result = yield this.model().update(upc, name, data);
  this.body = {items: result};
};

exports.del = function *() {
  var upc = this.params.upc; 
  var name = this.params.name;
  var result = yield this.model().delete(upc, name); 
  this.body = {items: result};
};