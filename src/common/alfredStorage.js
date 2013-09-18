'use strict';

app.factory('alfredStorage', function () {
  var REMOVED_STORAGE_ID = 'alfred_removed';
  var DEADLINES_STORAGE_ID  =  "alfred_deadlines";
  var IS_NEW_STORAGE_ID = "new";
  var USER_STORAGE_ID = "user_id";
  var IS_SIGNED_IN_STORAGE_ID = "sign_in";

  var isNew = function(){
    return JSON.parse(localStorage.getItem(IS_NEW_STORAGE_ID) || '1');
  };

  var reNew = function(){
    localStorage.setItem(IS_NEW_STORAGE_ID, '1');
  };

  var unNew = function(){
    localStorage.setItem(IS_NEW_STORAGE_ID, '0');
  };
  
  var getRemoved = function(){
    return JSON.parse(localStorage.getItem(REMOVED_STORAGE_ID) || '[]');
  };
  var setRemoved = function(removedDeadlines){
    localStorage.setItem(REMOVED_STORAGE_ID, JSON.stringify(removedDeadlines));
  };

  var getDeadlines = function(){
    return JSON.parse(localStorage.getItem(DEADLINES_STORAGE_ID) || '[]');
  };

  var setDeadlines = function(deadlines){
    localStorage.setItem(DEADLINES_STORAGE_ID, JSON.stringify(deadlines));
  };

  var removeExpiredDeadlinesInRemovedDeadlines = function(){
    var removedDeadlines = getRemoved().filter(function(removedDeadline){
      var deadline_time = moment(removedDeadline.time, "YYYYMMDDTHHmmssZ");
      return moment().isBefore(deadline_time);
    });
    setRemoved(removedDeadlines);
  };

  var removeExpiredDeadlinesInDeadlines =  function(){
    var deadlines = getDeadlines().filter(function(deadline){
      var deadline_time = moment(deadline.time, "YYYYMMDDTHHmmssZ");
      return moment().isBefore(deadline_time);
    });
    setDeadlines(deadlines);
  };

  return {
    isNew: isNew,

    reNew: reNew,

    unNew: unNew,

    getRemoved: getRemoved,

    setRemoved: setRemoved,

    getDeadlines: getDeadlines,

    setDeadlines: setDeadlines,

    removeExpiredDeadlinesInRemovedDeadlines: removeExpiredDeadlinesInRemovedDeadlines,

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
      localStorage.setItem(REMOVED_STORAGE_ID, '[]');
    },
    
    isSignedIn: function(){
      return JSON.parse(localStorage.getItem(IS_SIGNED_IN_STORAGE_ID) || '0');
    },
    
    signIn: function(){
      localStorage.setItem(IS_SIGNED_IN_STORAGE_ID, '1');
    }, 

    signOut: function(){
      localStorage.setItem(IS_SIGNED_IN_STORAGE_ID, '0');
    },

    removeExpiredDeadlines: function(){
      removeExpiredDeadlinesInRemovedDeadlines();
      removeExpiredDeadlinesInDeadlines();
    }
  }
});