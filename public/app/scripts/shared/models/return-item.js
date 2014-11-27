ReturnItem = {};

(function (App) {
  'use strict';

  ReturnItem = function (doc) {
    _.extend(this, doc);
    this.id = this.returnId + ',' + this.upc;
  };

})(window.App);
