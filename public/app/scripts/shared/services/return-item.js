(function (App) {
  'use strict';

  var baseUrl = App.config.apiEndpoint;

  App.app.factory('ReturnItem', ['$resource', function ($resource) {
    var methods = {
      create: {url: baseUrl + '/returnitems', method: 'POST'},
      find: {url: baseUrl + '/returnitems/:returnId/:upc', method: 'GET'},
      get: {url: baseUrl + '/returnitems', method: 'GET'},
      delete: {url: baseUrl + '/returnitems/:returnId/:upc', method: 'DELETE'},
      update: {url: baseUrl + '/returnitems/:returnId/:upc', method: 'PUT'}
    };
    return $resource(baseUrl + '/returnitems/:returnId/:upc', {returnId: '@returnId', upc: '@upc'}, methods); 
  }]);

})(window.App);
