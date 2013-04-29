/*global todomvc */
'use strict';
app.controller('appCtrl', function AlfredCtrl($scope, courseService) {
  var events = JSON.parse(localStorage["events"]);
  $scope.deadlines = events.deadlines;
  $scope.new = events.new;
  console.log(events);
  $scope.openDeadlineInNewTab = function(deadline){
    chrome.tabs.create({'url': deadline.link});
  };
});
