(function (App) {
  'use strict';

  App.app.controller('ManagerDeliverCtrl', ['$scope', function ($scope) {
    $scope.deliverForm = {
      data: {},
      errors: []
    };

    $scope.getOrders = function () {                                            
      return App.collection.order.getCustom(function (order) {
        return !order.deliveredDate;
      });
    };
    
    $scope.deliver = function () {
      var data = {
        id: $scope.deliverForm.data.order.id,
        deliveredDate: $scope.deliverForm.data.deliveredDate
      };
      App.collection.order.update(data, function (result) {
        $scope.addAlert('Delivery successfully recorded', true);
      });
    };

  }]);

})(window.App);
