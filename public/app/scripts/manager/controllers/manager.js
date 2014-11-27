(function (App) {
  'use strict';

  App.app.controller('ManagerCtrl', ['$scope', function ($scope) {
    $scope.state.controller = 'manager'; 
    $scope.state.section = 'add';
  }]);

})(window.App);
