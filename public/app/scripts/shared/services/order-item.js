(function (App) {
  'use strict';

  var baseUrl = App.config.apiEndpoint;

  App.app.factory('OrderItem', ['$resource', function ($resource) {
    var methods = {
      create: {url: baseUrl + '/orderitems', method: 'POST'},
      find: {url: baseUrl + '/orderitems/:orderId/:upc', method: 'GET'},
      get: {url: baseUrl + '/orderitems', method: 'GET'},
      delete: {url: baseUrl + '/orderitems/:orderId/:upc', method: 'DELETE'},
      update: {url: baseUrl + '/orderitems/:orderId/:upc', method: 'PUT'}
    };
    return $resource(baseUrl + '/orderitems/:orderId/:upc', {orderId: '@orderId', upc: '@upc'}, methods); 
  }]);

})(window.App);
