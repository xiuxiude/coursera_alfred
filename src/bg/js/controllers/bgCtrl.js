/*global todomvc */
'use strict';

app.controller('bgCtrl', function AlfredCtrl($scope, courseService) {
  courseService.getCourses().then(function(events){
    localStorage.setItem("deadlines", JSON.stringify(events.deadlines))
  });
});
