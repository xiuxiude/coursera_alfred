'use strict';

app.factory('alfredStorage', function () {
  var REMOVED_STORAGE_ID = 'alfred_removed';
  var DEADLINES_STORAGE_ID  =  "alfred_deadlines";
  var IS_NEW_STORAGE_ID = "new"
  
  return {
    getDeadlines: function(){
      return JSON.parse(localStorage.getItem(DEADLINES_STORAGE_ID) || '[]');
    },
    
    isNew: function(){
      return JSON.parse(localStorage.getItem(IS_NEW_STORAGE_ID) || '1');
    },
    
    getRemoved: function () {
      return JSON.parse(localStorage.getItem(REMOVED_STORAGE_ID) || '{"ignored":[],"completed":[]}');
    },

    putRemoved: function (removedDeadlines) {
      localStorage.setItem(REMOVED_STORAGE_ID, JSON.stringify(removedDeadlines));
    }
  };
});