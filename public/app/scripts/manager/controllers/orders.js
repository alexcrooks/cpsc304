(function (App) {
  'use strict';

  App.app.controller('OrdersCtrl', ['$scope', function ($scope) {

    $scope.init = function () {
      var nop = function () {};
      App.collection.order.load({}, nop);
      App.collection.orderItem.load({}, nop);
    };

    $scope.init();

  }]);

})(window.App);
