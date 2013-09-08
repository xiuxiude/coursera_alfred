'use strict';

app.controller('bgCtrl', function BgCtrl($scope, courseService, alfredStorage) {
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
      alfredStorage.reset();
      courseService.updateData();
    });
  })
});

