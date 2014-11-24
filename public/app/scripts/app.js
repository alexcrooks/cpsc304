(function (App) {
  'use strict';

  App.collection = {
      collections: [
        {name: 'Customer', id: 'id'},
        {name: 'HasSong'},
        {name: 'Item', id: 'upc'},
        {name: 'LeadSinger'},
        {name: 'Order', id: 'id'},
        {name: 'OrderItem'},
        {name: 'Return', id: 'id'},
        {name: 'ReturnItem'}
      ]
  };

  App.app = angular.module('cpsc304App', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngCollection',
    'ui.bootstrap'
  ]);

  var collectionNames = _.map(App.collection.collections, function (collectionData) {
    return collectionData.name + 'Collection';
  });

  App.app.run(_.union(collectionNames, [function () {
    var object;
    _.each(arguments, function (argument) {
      if (typeof argument === 'function') {
        object = new argument();
        App.collection[object.instance.toLowerCase()] = object;
      }
    });
  }]));

  App.app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/customer', {
      templateUrl: 'scripts/customer/views/index.html',
      controller: 'CustomerCtrl'
    });

    $routeProvider.when('/clerk', {
      templateUrl: 'scripts/clerk/views/index.html',
      controller: 'ClerkCtrl'
    });

    $routeProvider.when('/manager', {
      templateUrl: 'scripts/manager/views/index.html',
      controller: 'ManagerCtrl'
    });

    $routeProvider.when('/', {
      templateUrl: 'scripts/home/views/index.html',
      controller: 'HomeCtrl'
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }]);

})(window.App);
