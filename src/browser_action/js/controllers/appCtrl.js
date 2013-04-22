/*global todomvc */
'use strict';

app.controller('appCtrl', function AlfredCtrl($scope, courseService) {
  $scope.deadlines = JSON.parse(localStorage["deadlines"]);
});
