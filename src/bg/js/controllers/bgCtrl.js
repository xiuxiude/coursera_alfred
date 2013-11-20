
'use strict';

app.controller('bgCtrl', function BgCtrl($scope, $timeout, courseService, alfredStorage) {
  // init
  courseService.updateData();
  
  // update the data every 60 mintues
  var interval = 60;
  
  chrome.alarms.create("scheduleRequest", {periodInMinutes: interval});
  
  chrome.alarms.onAlarm.addListener(function(alarm){
    if(alarm.name === "scheduleRequest"){
      $scope.$apply(
        courseService.updateData
      );
    }
  });

  //update data when user enrolled a new course, un-enrolled a course, or user changed
  chrome.cookies.onChanged.addListener(function(info){
    console.log("cookies is changed", info);
    $scope.$apply(function(){
      // if and only if when cookie responsible for user was deleted, reset the whole local storage
      if(info.cookie.name === "CAUTH" && info.removed === true)
        alfredStorage.reset();
      // wait a second for coursera responding to user's action
      $timeout(function(){courseService.updateData()}, 1000);
    });
  })
});

