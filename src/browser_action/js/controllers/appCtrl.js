/*global todomvc */
'use strict';
app.controller('appCtrl', function AlfredCtrl($scope, courseService) {
  var deadlines = JSON.parse(localStorage["deadlines"]);

  $scope.deadlines = deadlines;
  
  $scope.openDeadlineInNewTab = function(deadline){
    chrome.tabs.create({'url': deadline.link});
  };
});
