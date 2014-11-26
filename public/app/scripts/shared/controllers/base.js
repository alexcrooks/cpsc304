(function (App) {
  'use strict';

  App.app.controller('BaseCtrl', ['$scope', function ($scope) {
    $scope.state = {
      appReady: false,
      controller: '',
      customer: null
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

    $scope.init();

  }]);

})(window.App);
