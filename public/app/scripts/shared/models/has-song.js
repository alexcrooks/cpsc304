HasSong = {};

(function (App) {
  'use strict';

  HasSong = function (doc) {
    _.extend(this, doc);
    this.id = this.upc + ',' + this.title;
  };

})(window.App);
