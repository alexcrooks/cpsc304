Item = {};

(function (App) {
  'use strict';

  Item = function (doc) {
    _.extend(this, doc);
  };

  Item.type = {
    CD: 'CD',
    DVD: 'DVD'
  };

  Item.category = {
    ROCK: 'Rock',
    POP: 'Pop',
    RAP: 'Rap',
    COUNTRY: 'Country',
    CLASSICAL: 'Classical',
    NEW_AGE: 'New Age',
    INSTRUMENTAL: 'Instrumental'
  };

  /**
   * Use a complicated search separator so the searches do not bleed between
   * each other.
   * 
   * This is used for the getForSearch() method where it translates an array of
   * objects, e.g. songs: [{name: 'Dark Fantasy'}, {name: 'Gorgeous'}] to a
   * concatenated string, e.g. 'Dark Fantasy Gorgeous'.
   *
   * With 'Dark Fantasy Gorgeous', searching for 'Fantasy Gorgeous' will return
   * this item, which is not a valid search return.
   *
   * With 'Dark Fantasy;;;Gorgeous', the user will only get items back that have
   * song names matching their search.
   */
  Item.searchSeparator = ';;;';

  Item.prototype.isCd = function () {
    return this.type === Item.type.CD;
  };

  Item.prototype.isDvd = function () {
    return this.type === Item.type.DVD;
  };

  Item.prototype.isCategory = function (category) {
    return this.category === category
  };

  Item.prototype.getTypeDisplayName = function () {
    return Item.type[this.type];
  };

  Item.prototype.getCategoryDisplayName = function () {
    return Item.category[this.category];
  };

  Item.prototype.getSingers = function () {
    return App.collection.leadSinger.getWhere({upc: this.upc});
  };

  Item.prototype.getSongs = function () {
    return App.collection.hasSong.getWhere({upc: this.upc});
  };

  Item.prototype.getSongsForSearch = function () {
    return this.getForSearch(this.getSongs(), 'title');
  };

  Item.prototype.getSingersForSearch = function () {
    return this.getForSearch(this.getSingers(), 'name');
  };

  Item.prototype.getForSearch = function (objects, field) {
    if (!objects.length) {
      return '';
    }
    return _.pluck(objects, field).join(Item.searchSeparator);
  };

})(window.App);
