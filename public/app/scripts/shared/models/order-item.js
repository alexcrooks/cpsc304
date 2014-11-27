OrderItem = {};

(function (App) {
  'use strict';

  OrderItem = function (doc) {
    _.extend(this, doc);
  };

  OrderItem.prototype.getItem = function () {
    return App.collection.item.get(this.upc);
  };

})(window.App);
