(function (App) {
  'use strict';

  var baseUrl = App.config.apiEndpoint;

  App.app.factory('LeadSinger', ['$resource', function ($resource) {
    var methods = {
      create: {url: baseUrl + '/singers', method: 'POST'},
      find: {url: baseUrl + '/singers/:upc/:name', method: 'GET'},
      get: {url: baseUrl + '/singers', method: 'GET'},
      delete: {url: baseUrl + '/singers/:upc/:name', method: 'DELETE'},
      update: {url: baseUrl + '/singers/:upc/:name', method: 'PUT'}
    };
    return $resource(baseUrl + '/singers/:upc/:name', {upc: '@upc', name: '@name'}, methods); 
  }]);

})(window.App);
