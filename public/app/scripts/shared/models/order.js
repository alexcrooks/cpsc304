Order = {};

(function (App) {
  'use strict';

  Order = function (doc) {
    _.extend(this, doc);
  };

  Order.prototype.getOrderItems = function () {
    return App.collection.orderItem.getWhere({orderId: this.id});
  };

  Order.prototype.getTotal = function () {
    var total = 0;
    _.each(this.getOrderItems(), function (orderItem) {
      total += orderItem.quantity * orderItem.getItem().price;
    });
    return total;
  };

})(window.App);
