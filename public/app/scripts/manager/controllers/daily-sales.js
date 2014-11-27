(function (App) {
  'use strict';

  App.app.controller('ManagerDailySalesCtrl', ['$scope', function ($scope) {

    $scope.reportData = [];

    $scope.dailySalesForm = {
      data: {}
    };

    $scope.getCategories = function () {
      return _.uniq(_.pluck($scope.reportData, 'category'));
    };

    $scope.getCategoryDisplay = function (category) {
      return Item.category[category] || '';
    };

    $scope.getReportDataByCategory = function (category) {
      return _.where($scope.reportData, {category: category});
    };

    $scope.getTotalUnits = function (lines) {
      if (!lines) {
        lines = $scope.reportData;
      }
      var total = 0;
      _.each(lines, function (line) {
        total += line.units;
      });
      return total;
    };

    $scope.getTotal = function (lines) {
      if (!lines) {
        lines = $scope.reportData;
      }
      var total = 0;
      _.each(lines, function (line) {
        total += line.total;
      });
      return total;
    };

    $scope.loadReport = function () {
      var date = moment($scope.dailySalesForm.data.date).format(App.config.dbDateFormat);
      var result = App.collection.order.service.dailySales({date: date}, function () {
        $scope.reportData = result.data.report
      });
    };

    $scope.clearReport = function () {
      $scope.dailySalesForm.data = {};
      $scope.reportData = [];
    };

  }]);

})(window.App);
