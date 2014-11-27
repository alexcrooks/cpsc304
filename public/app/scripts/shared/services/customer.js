(function (App) {
  'use strict';

  var baseUrl = App.config.apiEndpoint;

  App.app.factory('Customer', ['$resource', function ($resource) {
    var methods = {
      create: {url: baseUrl + '/customers', method: 'POST'},
      find: {url: baseUrl + '/customers/:id', method: 'GET'},
      get: {url: baseUrl + '/customers', method: 'GET'},
      delete: {url: baseUrl + '/customers/:id', method: 'DELETE'},
      update: {url: baseUrl + '/customers/:id', method: 'PUT'}
    };
    return $resource(baseUrl + '/customers/:id', {id: '@id'}, methods); 
  }]);

})(window.App);
