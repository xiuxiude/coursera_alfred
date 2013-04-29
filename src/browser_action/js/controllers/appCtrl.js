/*global todomvc */
'use strict';
app.controller('appCtrl', function AlfredCtrl($scope, courseService) {
  var events. = JSON.parse(localStorage["events"]);

  $scope.deadlines = events.deadlines;
  $scope.no_deadlines = events.new && events.deadline

  $scope.openDeadlineInNewTab = function(deadline){
    chrome.tabs.create({'url': deadline.link});
  };
});
