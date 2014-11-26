(function (App) {
  'use strict';

  App.app.controller('CartCtrl', ['$scope', function ($scope) {

    $scope.getItems = function () {
      var upcs = _.pluck($scope.state.cart, 'upc');
      return App.collection.item.getCustom(function (item) {
        return _.contains(upcs, item.upc);
      });
    };

    $scope.getQuantity = function (upc) {
      var cartItem = _.findWhere($scope.state.cart, {upc: upc});
      if (cartItem) {
        return cartItem.quantity;
      }
      return 0;
    };

    $scope.getTotal = function (upc) {
      var quantity = $scope.getQuantity(upc);
      var item = App.collection.item.get(upc);
      return quantity * item.price;
    };
    
  }]);

})(window.App);
