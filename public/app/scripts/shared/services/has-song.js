(function (App) {
  'use strict';

  var baseUrl = App.config.apiEndpoint;

  App.app.factory('HasSong', ['$resource', function ($resource) {
    var methods = {
      create: {url: baseUrl + '/songs', method: 'POST'},
      find: {url: baseUrl + '/songs/:upc/:title', method: 'GET'},
      get: {url: baseUrl + '/songs', method: 'GET'},
      delete: {url: baseUrl + '/songs/:upc/:title', method: 'DELETE'},
      update: {url: baseUrl + '/songs/:upc/:title', method: 'PUT'}
    };
    return $resource(baseUrl + '/songs/:upc/:title', {upc: '@upc', title: '@title'}, methods); 
  }]);

})(window.App);
