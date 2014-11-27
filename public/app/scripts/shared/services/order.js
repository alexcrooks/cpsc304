(function (App) {
  'use strict';

  var baseUrl = App.config.apiEndpoint;

  App.app.factory('Order', ['$resource', function ($resource) {
    var methods = {
      create: {url: baseUrl + '/orders', method: 'POST'},
      find: {url: baseUrl + '/orders/:id', method: 'GET'},
      get: {url: baseUrl + '/orders', method: 'GET'},
      delete: {url: baseUrl + '/orders/:id', method: 'DELETE'},
      update: {url: baseUrl + '/orders/:id', method: 'PUT'}
    };
    return $resource(baseUrl + '/orders/:id', {id: '@id'}, methods); 
  }]);

})(window.App);
