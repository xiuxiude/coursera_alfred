/*global todomvc */
'use strict';

app.controller('appCtrl', function AlfredCtrl($scope, courseService) {
  $scope.title = "Course Alfred";
  courseService.getUserId()
  .then(courseService.getAllCourses)
  .then(courseService.getAllCoursesOut)
  .then(courseService.getPages)
  .then(courseService.getEvents)
  .then(function(events){
    $scope.events = events;
  });
});
