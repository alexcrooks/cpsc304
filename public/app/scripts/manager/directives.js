(function (App) {
  'use strict';

  App.app.directive('managerHome', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'scripts/manager/views/home.html'
    };
  });

  App.app.directive('managerAdd', function () {
    return {
      restrict: 'A',
      replace: true,
      controller: 'ManagerAddCtrl',
      templateUrl: 'scripts/manager/views/add.html'
    };
  });

  App.app.directive('managerDeliver', function () {
    return {
      restrict: 'A',
      replace: true,
      controller: 'ManagerDeliverCtrl',
      templateUrl: 'scripts/manager/views/deliver.html'
    };
  });

  App.app.directive('managerDailySales', function () {
    return {
      restrict: 'A',
      replace: true,
      controller: 'ManagerDailySalesCtrl',
      templateUrl: 'scripts/manager/views/daily-sales.html'
    };
  });

  App.app.directive('managerTopItems', function () {
    return {
      restrict: 'A',
      replace: true,
      controller: 'ManagerTopItemsCtrl',
      templateUrl: 'scripts/manager/views/top-items.html'
    };
  });

  App.app.directive('orders', function () {
    return {
      restrict: 'A',
      replace: true,
      controller: 'OrdersCtrl',
      templateUrl: 'scripts/manager/views/orders.html'
    };
  });

})(window.App);
