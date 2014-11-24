(function (App) {
  'use strict';

  var baseUrl = App.config.apiEndpoint;

  App.app.factory('Return', ['$resource', function ($resource) {
    var methods = {
      create: {url: baseUrl + '/returns', method: 'POST'},
      find: {url: baseUrl + '/returns/:id', method: 'GET'},
      get: {url: baseUrl + '/returns', method: 'GET'},
      delete: {url: baseUrl + 'returns/:id', method: 'DELETE'},
      update: {url: baseUrl + 'returns/:id', method: 'PUT'}
    };
    return $resource(baseUrl + '/returns/:id', {upc: '@id'}, methods); 
  }]);

})(window.App);
