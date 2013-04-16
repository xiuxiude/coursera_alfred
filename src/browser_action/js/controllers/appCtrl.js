/*global todomvc */
'use strict';

app.controller('appCtrl', function AlfredCtrl($scope, courseService) {
  courseService.getCourses().then(function(events){
    $scope.deadlines = events.deadlines;
    $scope.courses = events.courses;
  });
});
