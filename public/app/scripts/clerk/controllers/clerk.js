(function (App) {
  'use strict';

  App.app.controller('ClerkCtrl', ['$scope', function ($scope) {
    $scope.state.controller = 'clerk'; 
  

  var returnForm = {
      data: {},
      errors: []
    };

    var testOrder = {
    	order_id: 123,
    	upc: 1
    }

  $scope.login = function () {
      returnForm.errors = [];

      if (returnForm.data.return.order_id === testOrder.order_id && returnForm.data.return.upc
       === testOrder.upc) {
        successMessage = 'Item successfully refunded to Customer';
      } else {
        returnForm.errors.push('You could not be logged in.');
      }
    };

    $scope.returnForm = returnForm;

}]);

})(window.App);
