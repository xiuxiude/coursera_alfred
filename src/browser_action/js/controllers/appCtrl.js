/*global todomvc */
'use strict';
app.controller('appCtrl', function AlfredCtrl($scope, courseService) {
  var events = JSON.parse(localStorage["events"]);
  
  $scope.deadlines = events.deadlines;
  $scope.new = events.new;
  
  $scope.openDeadlineInNewTab = function(deadline){
    chrome.tabs.create({'url': deadline.link});
  };

  //when a deadline is done, add it to localStorage
  $scope.removeDeadline = function(deadline){
    deadline['done'] = true;
    var old_value = JSON.parse(localStorage.getItem('rmed_deadlines'));
    old_value.push(deadline);
    localStorage.setItem('rmed_deadlines', JSON.stringify(old_value));
  }
});
