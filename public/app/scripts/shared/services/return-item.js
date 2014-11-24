(function (App) {
  'use strict';

  var baseUrl = App.config.apiEndpoint;

  App.app.factory('ReturnItem', ['$resource', function ($resource) {
    var methods = {
      create: {url: baseUrl + '/return-items', method: 'POST'},
      find: {url: baseUrl + '/return-items/:returnId/:upc', method: 'GET'},
      get: {url: baseUrl + '/return-items', method: 'GET'},
      delete: {url: baseUrl + 'return-items/:returnId/:upc', method: 'DELETE'},
      update: {url: baseUrl + 'return-items/:returnId/:upc', method: 'PUT'}
    };
    return $resource(baseUrl + '/return-items/:returnId/:upc', {returnId: '@returnId', upc: '@upc'}, methods); 
  }]);

})(window.App);
