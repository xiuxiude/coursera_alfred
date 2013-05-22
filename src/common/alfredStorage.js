'use strict';

app.factory('alfredStorage', function () {
  var REMOVED_STORAGE_ID = 'alfred_removed';
  var DEADLINES_STORAGE_ID  =  "alfred_deadlines";
  var IS_NEW_STORAGE_ID = "new";
  var USER_STORAGE_ID = "user_id";
  var IS_SIGNED_IN_STORAGE_ID = "sign_in";

  var reNew = function(){
    localStorage.setItem(IS_NEW_STORAGE_ID, '1');
  };

  var unNew = function(){
    localStorage.setItem(IS_NEW_STORAGE_ID, '0');
  }
  var getRemoved = function(){
    return JSON.parse(localStorage.getItem(REMOVED_STORAGE_ID) || '[]');
  };
  var putRemoved = function(removedDeadlines){
    localStorage.setItem(REMOVED_STORAGE_ID, JSON.stringify(removedDeadlines));
  };

  return {
    getRemoved: getRemoved,

    putRemoved: putRemoved,

    reNew: reNew,

    unNew: unNew,

    isNew: function(){
      return JSON.parse(localStorage.getItem(IS_NEW_STORAGE_ID) || '1');
    },
    
    getUserID: function(){
      return JSON.parse(localStorage.getItem(USER_STORAGE_ID) || '0');
    },
    
    setUserID: function(user_id){
      localStorage.setItem(USER_STORAGE_ID, JSON.stringify(user_id));
    },
    
    reset: function(){
      localStorage.removeItem(IS_SIGNED_IN_STORAGE_ID);
      localStorage.removeItem(USER_STORAGE_ID);
      localStorage.setItem(DEADLINES_STORAGE_ID, '[]');
      reNew();
    },
    
    getDeadlines: function(){
      return JSON.parse(localStorage.getItem(DEADLINES_STORAGE_ID) || '[]');
    },

    isSignedIn: function(){
      return JSON.parse(localStorage.getItem(IS_SIGNED_IN_STORAGE_ID) || '0');
    },
    
    signIn: function(){
      localStorage.setItem(IS_SIGNED_IN_STORAGE_ID, '1');
    },
    
    signOut: function(){
      localStorage.setItem(IS_SIGNED_IN_STORAGE_ID, '0');
      putRemoved([]);
    },
    
    setDeadlines: function(deadlines){
      localStorage.setItem(DEADLINES_STORAGE_ID, JSON.stringify(deadlines));
    },
    
    removeExpiredDeadlines: function(){
      var removedDeadlines = getRemoved().filter(function(removedDeadline){
        return moment().isBefore(removedDeadline.time);
      });
      putRemoved(removedDeadlines);
    }
  };
});