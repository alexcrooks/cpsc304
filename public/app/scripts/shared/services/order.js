(function (App) {
  'use strict';

  var baseUrl = App.config.apiEndpoint;

  App.app.factory('Order', ['$resource', function ($resource) {
    var methods = {
      create: {url: baseUrl + '/orders', method: 'POST'},
      find: {url: baseUrl + '/orders/:id', method: 'GET'},
      get: {url: baseUrl + '/orders', method: 'GET'},
      delete: {url: baseUrl + '/orders/:id', method: 'DELETE'},
      update: {url: baseUrl + '/orders/:id', method: 'PUT'},
      dailySales: {url: baseUrl + '/orders/daily-sales/:date', method: 'GET'},
      topItems: {url: baseUrl + '/orders/top-items/:date/:limit', method: 'GET'}
    };
    return $resource(baseUrl + '/orders/:id', {id: '@id', date: '@date', limit: '@limit'}, methods); 
  }]);

})(window.App);
