LeadSinger = {};

(function (App) {
  'use strict';

  LeadSinger = function (doc) {
    _.extend(this, doc);
    this.id = this.upc + ',' + this.name;
  };

})(window.App);
