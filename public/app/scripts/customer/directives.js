(function (App) {
  'use strict';

  App.app.directive('storeSection', function () {
    return {
      restrict: 'A',
      replace: true,
      controller: 'StoreCtrl',
      templateUrl: 'scripts/customer/views/store-section.html'
    };
  });

  App.app.directive('cartSection', function () {
    return {
      restrict: 'A',
      replace: true,
      controller: 'CartCtrl',
      templateUrl: 'scripts/customer/views/cart-section.html'
    };
  });

  App.app.directive('checkoutSection', function () {
    return {
      restrict: 'A',
      replace: true,
      controller: 'CheckoutCtrl',
      templateUrl: 'scripts/customer/views/checkout-section.html'
    };
  });

  App.app.directive('item', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'scripts/customer/views/item.html'
    };
  });

})(window.App);
