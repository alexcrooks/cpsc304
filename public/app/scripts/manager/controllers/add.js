(function (App) {
  'use strict';

  App.app.controller('ManagerAddCtrl', ['$scope', function ($scope) {
    $scope.addForm = {
      data: {},
      errors: []
    };

    $scope.submit = function (addNgForm) {
      App.collection.item.insert($scope.addForm.data, function (item) {
        if (item) {
          $scope.addAlert('Item successfully added!');
          $scope.clear(addNgForm);
        } else {
          $scope.addAlert('Item add failed.', true);
        }
      });
    };

    $scope.clear = function (addNgForm) {
      $scope.addForm.data = {};
      addNgForm.$setPristine();
    };

  }]);

})(window.App);
