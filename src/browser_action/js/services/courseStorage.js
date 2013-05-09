'use strict';

app.factory('courseStorage', function () {
  var REMOVED_STORAGE_ID = 'alfred_removed';
  var DEADLINES_ID  =  "events";
  
  return {
    get: function () {
      return JSON.parse(localStorage.getItem(REMOVED_STORAGE_ID) || '{"ignored":[],"completed":[]}');
    },

    put: function (removedDeadlines) {
      localStorage.setItem(REMOVED_STORAGE_ID, JSON.stringify(removedDeadlines));
    }
  };
});