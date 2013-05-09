/*global todomvc */
'use strict';
app.controller('appCtrl', function AlfredCtrl($scope, courseStorage) {
  var events = JSON.parse(localStorage["events"]);
  
  $scope.deadlines = events.deadlines;
  $scope.new = events.new;


  var removedDeadlines = $scope.removedDeadlines = courseStorage.get();
  
  $scope.$watch('removedDeadlines', function () {
    courseStorage.put(removedDeadlines);
  }, true);
  
  $scope.openDeadlineInNewTab = function(deadline){
    chrome.tabs.create({'url': deadline.link});
  };
  
  $scope.removeDeadline = function (deadline, type) {
    switch (type) {
      case "ignore":
      removedDeadlines.ignored.push(deadline);
      break;
      case "complete":
      removedDeadlines.completed.push(deadline);
      break;
    }
  };

});
