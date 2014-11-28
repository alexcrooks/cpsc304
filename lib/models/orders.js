'use strict';

var _ = require('underscore');
var db = require('../helpers/db.js');
var moment = require('moment');
var ORDERS_PER_DAY = 3;

module.exports = {
  insert: function *(data) {
    var orderItems = data.orderItems;
    data.expectedDate = yield this.getExpectedDate();
    delete data.orderItems;
    yield db.query('START TRANSACTION');
    var insertId = yield db.insert('order', data);

    _.each(orderItems, function (orderItem) {
      orderItem.orderId = insertId;
    });
    yield db.insertMany('order_item', orderItems);
    var items = yield this.updateItemQuantities(orderItems);
    yield db.query('COMMIT');
    var order = yield db.get('order', {id: insertId});
    order.orderItems = yield db.getWithSearch('order_item', {order_id: insertId});
    order.items = items;
    return order;
  },

  getExpectedDate: function *() {
    var now = moment().format('YYYY-MM-DD');
    var result = yield db.query('SELECT COUNT(id) as numUpcomingOrders FROM `order` WHERE date >= ?', [now]);
    result = result[0];
    var daysOfOrders = Math.floor(result.numUpcomingOrders / ORDERS_PER_DAY);
    return moment().add(daysOfOrders, 'days').format('YYYY-MM-DD');
  },

  updateItemQuantities: function *(orderItems) {
    var items, item, orderItem, result;
    items = [];
    for (var i = 0; i < orderItems.length; i++) {
      orderItem = orderItems[i];
      result = yield db.query('UPDATE item SET stock = (stock - ?) WHERE upc = ?', [orderItem.quantity, orderItem.upc]);
      item = yield db.get('item', {upc: orderItem.upc});
      items.push(item);
    }
    return items;
  },

  update: function *(id, data) {
    var selector = {id: id};
    var updateResult = yield db.update('order', selector, data);
    return updateResult ? yield db.get('order', selector) : null;
  },

  delete: function *(id) {
    return yield db.delete('order', {id: parseInt(id)});
  },

  get: function *(id) {
    return yield db.get('order', {id: parseInt(id)});
  },

  getMany: function *(id) {
    return yield db.getMany('order');
  },

  dailySales: function *(date) {
    var query = 'SELECT item.upc AS upc, item.title AS title, item.category AS category, item.price AS price, SUM(quantity) AS units, (SUM(quantity) * price) as total FROM order_item LEFT JOIN item ON order_item.upc = item.upc LEFT JOIN `order` on order_item.order_id = order.id WHERE order.date = ? GROUP BY item.upc, item.category';
    var params = [date];
    var result = yield db.query(query, params);
    return result;
  },

  topItems: function *(date, limit) {
    var query = 'SELECT item.title AS title, item.company AS company, item.stock AS stock, SUM(order_item.quantity) AS units FROM order_item LEFT JOIN item ON item.upc = order_item.upc LEFT JOIN `order` on order.id = order_item.order_id WHERE order.date = ? GROUP BY item.upc ORDER BY units DESC LIMIT ?';
    var params = [date, limit];
    var result = yield db.query(query, params);
    return result;
  }
};
