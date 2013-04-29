'use strict';

// set deadlines to empty array when user install the extension
chrome.runtime.onInstalled.addListener(function() {
  localStorage.setItem("events", "{'new':1}")
});

app.controller('bgCtrl', function BgCtrl($scope, courseService) {
  var updateData = function(){
    courseService.getCourses().then(function(events){
      localStorage.setItem("events", JSON.stringify(events));
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
  })
});
