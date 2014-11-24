(function (App) {
  'use strict';

  App.app.factory('BaseCollection', ['$collection', 'BaseService', function ($collection, BaseService) {
    var BaseCollection = $collection;

    BaseCollection.prototype.insert = function (data, callback) {
      var self = this;
      var result = self.service.create(data, function () {
        var item = new window[self.model](result.data.items);
        self.add(item);
        callback(item);
      });
    };

    BaseCollection.prototype.delete = function (selector, callback) {
      var self = this;
      var object = self.getWhere(selector);
      var result = self.service.delete(selector, function () {
        self.remove(object);
        callback();
      });
    };

    BaseCollection.prototype.load = function (selector, callback) {
      var self = this;
      var result = self.service.get(function () {
        var items = [];
        _.each(result.data.items, function (item) {
          items.push(new window[self.model](item));
        });
        self.addAll(items);
        callback(items);
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
