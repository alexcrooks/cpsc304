(function (App) {
  'use strict';

  App.app.controller('StoreCtrl', ['$scope', function ($scope) {
    $scope.state.page = 'customer';

    $scope.itemSearch = {};

    $scope.getItems = function () {
      return App.collection.item.all();
    };

    $scope.customFilter = function (item) {
      if (!_.isObject(item) || !_.isObject($scope.itemSearch) || !$scope.hasSearch()) {
        return true;
      }
      var searchCriteria = $scope.itemSearch;
      var type = _.isString(searchCriteria.type) ? searchCriteria.type : undefined;
      var category = _.isString(searchCriteria.category) ? searchCriteria.category : undefined;
      var title = _.isString(searchCriteria.title) ? searchCriteria.title.toLowerCase() : undefined;
      var singer = _.isString(searchCriteria.singer) ? searchCriteria.singer.toLowerCase() : undefined;
      var song = _.isString(searchCriteria.song) ? searchCriteria.song.toLowerCase() : undefined;

      if (type && item.type === type) {
        return true;
      }
      if (category && item.category === category) {
        return true;
      }
      if (title && item.title.toLowerCase().indexOf(title) > -1) {
        return true;
      }
      if (singer && item.getSingersForSearch().toLowerCase().indexOf(singer) > -1) {
        return true;
      }
      if (song && item.getSongsForSearch().toLowerCase().indexOf(song) > -1) {
        return true;
      }
      return false;
    };
    
    $scope.hasSearch = function () {
      return $scope.itemSearch.type 
        || $scope.itemSearch.category 
        || $scope.itemSearch.title 
        || $scope.itemSearch.singer 
        || $scope.itemSearch.song;
    };
  }]);

})(window.App);
