(function (App) {
  'use strict';

  _.each(App.collection.collections, function (collectionData) {
    App.app.factory(collectionData.name + 'Collection', ['BaseCollection', collectionData.name, function (BaseCollection) {
      var collection = function () {
        BaseCollection.apply(this, arguments);
      };
      if (collectionData.id) {
        collection.prototype = BaseCollection.getInstance({idAttribute: collectionData.id});
      } else {
        collection.prototype = BaseCollection.getInstance();
      }
      collection.prototype.instance = collectionData.name;
      collection.prototype.service = arguments[1];
      collection.prototype.model = collectionData.name;
      return collection;
    }]);
  });

})(window.App);
