'use strict';

var _ = require('underscore');

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
