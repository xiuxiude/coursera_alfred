'use strict';

app.controller('bgCtrl', function BgCtrl($scope, courseService, alfredStorage) {
  var DEADLINES_STORAGE_ID  =  "alfred_deadlines";
  var IS_NEW_STORAGE_ID = "new";
  var IS_SIGN_IN = 'sign_in';
  
  var updateData = function(){
    courseService.getCourses().then(function(events){
      if(events){
        localStorage.setItem(IS_SIGN_IN, '1');
        localStorage.setItem(DEADLINES_STORAGE_ID, JSON.stringify(events.deadlines));
        alfredStorage.removeExpiredDeadlines();
      }
      localStorage.setItem(IS_NEW_STORAGE_ID, '0');
    });
  };
  
  // init
  updateData();
  
  // update the data every 60 mintues
  var interval = 60;
  chrome.alarms.create("scheduleRewquest", {periodInMinutes: interval});

  chrome.alarms.onAlarm.addListener(function(alarm){
    if(alarm.name = "scheduleRequest"){
      updateData();
    }
  });

  //update data when user enrolled a new course, un-enrolled a course, or user changed
  chrome.cookies.onChanged.addListener(function(info){
    alfredStorage.reset()
    updateData();
  })
});

