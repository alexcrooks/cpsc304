'use strict';

exports.routes = {
  dailySales: {
    method: 'get',
    path: '/daily-sales'
  }
};

exports.dailySales = function *() {
  this.body = this.model().dailySales();
};
