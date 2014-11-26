(function () {
  'use strict';

  function lowercaseFirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  function underToCamel(string) {
    return string.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }

  App.helpers.string = {
    lowercaseFirst: lowercaseFirst,
    underToCamel: underToCamel
  };

})();
