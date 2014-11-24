(function (App) {
  'use strict';

  var baseUrl = App.config.apiEndpoint;

  App.app.factory('OrderItem', ['$resource', function ($resource) {
    var methods = {
      create: {url: baseUrl + '/order-items', method: 'POST'},
      find: {url: baseUrl + '/order-items/:orderId/:upc', method: 'GET'},
      get: {url: baseUrl + '/order-items', method: 'GET'},
      delete: {url: baseUrl + 'order-items/:orderId/:upc', method: 'DELETE'},
      update: {url: baseUrl + 'order-items/:orderId/:upc', method: 'PUT'}
    };
    return $resource(baseUrl + '/order-items/:orderId/:upc', {orderId: '@orderId', upc: '@upc'}, methods); 
  }]);

})(window.App);
