OrderItem = {};

(function (App) {
  'use strict';

  OrderItem = function (doc) {
    _.extend(this, doc);
    this.id = this.orderId + ',' + this.upc;
  };

  OrderItem.prototype.getItem = function () {
    return App.collection.item.get(this.upc);
  };

})(window.App);
