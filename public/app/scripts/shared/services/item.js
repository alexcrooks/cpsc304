(function (App) {
  'use strict';

  var baseUrl = App.config.apiEndpoint;

  App.app.factory('Item', ['$resource', function ($resource) {
    var methods = {
      create: {url: baseUrl + '/items', method: 'POST'},
      find: {url: baseUrl + '/items/:upc', method: 'GET'},
      get: {url: baseUrl + '/items', method: 'GET'},
      delete: {url: baseUrl + '/items/:upc', method: 'DELETE'},
      update: {url: baseUrl + '/items/:upc', method: 'PUT'}
    };
    return $resource(baseUrl + '/items/:upc', {upc: '@upc'}, methods); 
  }]);

})(window.App);
