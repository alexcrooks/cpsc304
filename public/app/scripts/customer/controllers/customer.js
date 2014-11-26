(function (App) {
  'use strict';

  App.app.controller('CustomerCtrl', ['$scope', function ($scope) {
    $scope.state.page = 'customer';
    $scope.state.section = 'shop';
    $scope.state.cart = [];

    var loginForm = {
      data: {},
      errors: []
    };

    var signUpForm = {
      data: {},
      errors: []
    };

    $scope.addToCart = function (upc, quantity) {
      $scope.state.cart.push({upc: upc, quantity: quantity});
    };

    $scope.removeFromCart = function (upc) {
      var cart = $scope.state.cart;
      $scope.state.cart = _.without(cart, _.findWhere(cart, {upc: upc}));
    };

    $scope.alreadyInCart = function (upc) {
      return !!_.findWhere($scope.state.cart, {upc: upc});
    };

    $scope.getTotalCartPrice = function (order) {
      order = order || $scope.state.cart;
      var total = 0;
      _.each(order, function (cartItem) {
        var item = App.collection.item.get(cartItem.upc);
        total += cartItem.quantity * item.price;
      });
      return total;
    };

    $scope.login = function () {
      loginForm.errors = [];

      var selector = {id: loginForm.data.username};
      App.collection.customer.loadOne(selector, function (customer) {
        if (!customer) {
          return loginForm.errors.push('You could not be logged in, invalid username.');
        }
        if (customer.password !== loginForm.data.password) {
          return loginForm.errors.push('You could not be logged in, invalid password.');
        }
        return $scope.state.customer = customer;
      });
    };

    $scope.loginForm = loginForm;

    $scope.signup = function () {
      signUpForm.errors = [];

      var data = {
        id: signUpForm.data.username,
        password: signUpForm.data.password,
        name: signUpForm.data.name,
        address: signUpForm.data.address,
        phone: signUpForm.data.phone
      };
      App.collection.customer.loadOne({id: data.id}, function (result) {
        if (result) {
          signUpForm.errors.push('That username has already been taken');
        } else {
          App.collection.customer.insert(data, function (customer) {
            $scope.state.customer = customer;
          });
        }
      });
    };


    $scope.signUpForm = signUpForm;
    
  }]);

})(window.App);
