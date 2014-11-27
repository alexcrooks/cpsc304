(function (App) {
  'use strict';

  App.app.factory('BaseCollection', ['$collection', 'BaseService', function ($collection, BaseService) {
    var BaseCollection = $collection;

    BaseCollection.prototype.insert = function (data, callback) {
      var self = this;
      var result = self.service.create(data, function () {
        var items = self.addToCollection(result.data.items);
        return callback(items);
      });
    };

    BaseCollection.prototype.update = function (data, callback) {
      var self = this;
      var result = self.service.update(data, function () {
        var items = self.addToCollection(result.data.items);
        return callback(items);
      });
    };

    BaseCollection.prototype.addToCollection = function (items) {
      var self = this;
      var arrayProvided = _.isArray(items);
      items = arrayProvided ? items : [items];
      var parsedItems = [];
      _.each(items, function (item) {
        _.each(item, function (value, property) {
          delete item[property];
          if (_.isObject(value) || _.isArray(value)) {
            var collection = property.slice(0, -1);
            App.collection[collection].addToCollection(value);
          } else {
            item[App.helpers.string.underToCamel(property)] = value;
          }
        });
        parsedItems.push(new window[self.model](item));
      });
      self.addAll(parsedItems);
      return arrayProvided ? parsedItems : parsedItems[0];
    };

    BaseCollection.prototype.delete = function (selector, callback) {
      var self = this;
      var object = self.getWhere(selector);
      var result = self.service.delete(selector, function () {
        self.remove(object);
        return callback();
      });
    };


    BaseCollection.prototype.loadOne = function (selector, callback) {
      var self = this;
      var result = self.service.find(selector, function () {
        if (_.isObject(result.data.items)) {
          var items = self.addToCollection(result.data.items);
          return callback(items);
        }
        return callback();
      });
    };

    BaseCollection.prototype.load = function (selector, callback) {
      var self = this;
      var result = self.service.get(function () {
        var items = self.addToCollection(result.data.items);
        return callback(items);
      });
    };

    BaseCollection.prototype.getWhere = function (criteria) {
      return _.where(this.array, criteria);
    };

    BaseCollection.prototype.getCustom = function (searchFn) {
      return _.filter(this.array, searchFn);
    };

    return BaseCollection;
  }]);

})(window.App);
