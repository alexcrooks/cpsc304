(function (App) {
  'use strict';

  App.app.controller('CheckoutCtrl', ['$scope', function ($scope) {

    $scope.checkoutForm = {
      order: null, // if this is set we're in the "thanks for shopping" phase
      data: {},
      errors: []
    };

    $scope.returnToShopping = function () {
      $scope.checkoutForm.order = null;
      $scope.state.section = 'shop';
    };

    $scope.getItem = function (upc) {
      return App.collection.item.get(upc);
    };

    $scope.getOrder = function () {
      if ($scope.checkoutForm.order) {
        return App.collection.orderItem.getWhere({orderId: $scope.checkoutForm.order.id});
      } else {
        return $scope.state.cart;
      }
    };

    $scope.checkout = function () {
      var order = {
        customerId: $scope.state.customer.id,
        date: moment().format(App.config.dateFormatDb),
        cardNumber: $scope.checkoutForm.data.cardNumber,
        cardExpiry: $scope.checkoutForm.data.cardExpiry,
        orderItems: $scope.state.cart 
      };
      App.collection.order.insert(order, function (order) {
        $scope.checkoutForm.order = order;
        $scope.state.cart = [];
      });
    };

  }]);

})(window.App);
