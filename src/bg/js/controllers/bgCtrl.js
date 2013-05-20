'use strict';

app.controller('bgCtrl', function BgCtrl($scope, courseService, alfredStorage) {
  // init
  courseService.updateData();
  
  // update the data every 60 mintues
  var interval = 60;
  chrome.alarms.create("scheduleRewquest", {periodInMinutes: interval});

  chrome.alarms.onAlarm.addListener(function(alarm){
    if(alarm.name = "scheduleRequest"){
      courseService.updateData();
    }
  });

  //update data when user enrolled a new course, un-enrolled a course, or user changed
  chrome.cookies.onChanged.addListener(function(info){
    alfredStorage.reset()
    courseService.updateData();
  });
});

