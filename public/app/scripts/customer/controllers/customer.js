(function (App) {
  'use strict';

  App.app.controller('CustomerCtrl', ['$scope', function ($scope) {
    $scope.state.controller = 'customer';

    var loginForm = {
      data: {},
      errors: []
    };

    var signUpForm = {
      data: {},
      errors: []
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

      if (signUpForm.data.username !== user.id)  {
      //   App.collection.customer.insert(data, function (customer) {
      //  $scope.state.customer = customer;
      //});
        $scope.state.customer = data;
      } else {
        signUpForm.errors.push('That username has already been taken');
      }
    }


    $scope.signUpForm = signUpForm;
    
  }]);

})(window.App);
