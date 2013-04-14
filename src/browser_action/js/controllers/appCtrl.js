/*global todomvc */
'use strict';

app.controller('appCtrl', function AlfredCtrl($scope, courseService) {
  $scope.title = "Course Alfred";
  
  courseService.getCourses().then(function(courses){
    $scope.courses = courses;
  });
  // courseService.getUserId()
  // .then(courseService.getAllCourses)
  // .then(courseService.getPages)
  // .then(courseService.getEvents)
  // .then(function(courses){
  //   $scope.courses = courses;
  // });
});
