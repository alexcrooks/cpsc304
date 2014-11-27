(function (App) {
  'use strict';

  App.app.controller('ManagerTopItemsCtrl', ['$scope', function ($scope) {

    $scope.reportData = [];

    $scope.topItemsForm = {
      data: {}
    };

    $scope.loadReport = function () {
      var date = moment($scope.topItemsForm.data.date).format(App.config.dbDateFormat);
      var num = parseInt($scope.topItemsForm.data.limit);
      var result = App.collection.order.service.topItems({date: date, limit: num}, function () {
        $scope.reportData = result.data.report
      });
    };

    $scope.clearReport = function () {
      $scope.topItemsForm.data = {};
      $scope.reportData = [];
    };

  }]);

})(window.App);
