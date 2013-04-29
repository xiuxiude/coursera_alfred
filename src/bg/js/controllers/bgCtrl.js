'use strict';

// set deadlines to empty array when user install the extension
chrome.runtime.onInstalled.addListener(function() {
  localStorage.setItem("events", '{"new":1}');
});

app.controller('bgCtrl', function BgCtrl($scope, courseService) {
  var updateData = function(){
    courseService.getCourses().then(function(events){
      console.log(events);
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
  });

  //remove user_id when current user log out
  var removeUserId = function(){
    var deferred = Q.defer();
    localStorage.removeItem("user_id");
    deferred.resolve();
    return deferred.promise;
  }

  //reset events when current user log out
  var resetEvents = function(){
    var deferred = Q.defer();
    localStorage.setItem("events", '{"new":1}');
    deferred.resolve();
    return deferred.promise;
  }

  //update data when user enrolled a new course, un-enrolled a course, or user changed
  chrome.cookies.onChanged.addListener(function(info){
    return removeUserId().then(
                      resetEvents
                      )
                      .then(function(){
                        updateData();
                      })
  })
});

