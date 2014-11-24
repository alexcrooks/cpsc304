(function (App) {
  'use strict';

  App.app.controller('CustomerCtrl', ['$scope', function ($scope) {
    $scope.state.controller = 'customer';

    var user = {
      id: 'alex',
      password: 'root',
      name: 'Alex'
    };

    var loginForm = {
      data: {},
      errors: []
    };

    $scope.login = function () {
      loginForm.errors = [];

      if (user.id === loginForm.data.username && user.password === loginForm.data.password) {
        $scope.state.customer = user;
      } else {
        loginForm.errors.push('You could not be logged in.');
      }
    };

    $scope.loginForm = loginForm;
  }]);

})(window.App);
