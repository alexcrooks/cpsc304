(function (App) {
  'use strict';

  App.app.controller('BaseCtrl', ['$scope', function ($scope) {
    $scope.state = {
      appReady: false,
      controller: '',
      customer: null,
      alerts: []
    };
    
    $scope.init = function () {
      $scope.state.appReady = true;
      var nop = function () {};                                                 
      App.collection.item.load({}, nop);                                        
      App.collection.hasSong.load({}, nop);                                     
      App.collection.leadSinger.load({}, nop);     
    };

    $scope.showFormError = function (ngForm, field, error) {
      return ngForm[field].$dirty && ngForm[field].$error[error];
    };

    $scope.debug = function () {
      console.log.apply(console, arguments);
    };

    $scope.addAlert = function (message, short) {
      var length = $scope.state.alerts.push({type: 'success', msg: message});
    };

    $scope.removeAlert = function (index) {
      $scope.state.alerts.splice(0, 1);
    };

    $scope.init();

  }]);

})(window.App);
