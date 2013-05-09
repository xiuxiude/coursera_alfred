/*global todomvc */
'use strict';
app.controller('appCtrl', function AlfredCtrl($scope, courseService) {
  var events = JSON.parse(localStorage["events"]);
  
  $scope.deadlines = events.deadlines;
  $scope.new = events.new;
  
  $scope.openDeadlineInNewTab = function(deadline){
    chrome.tabs.create({'url': deadline.link});
  };

  $scope.removeDeadline = function(deadline){
    var rmed_deadlines = JSON.parse(localStorage.getItem('rmed_deadlines'));
    rmed_deadlines.push(deadline);
    localStorage.setItem('rmed_deadlines', JSON.stringify(rmed_deadlines));
  };

  $scope.hideRemovedDeadline = function(deadlines){
   var rmed_deadlines_times = JSON.parse(localStorage["rmed_deadlines"])
                           .map(function(deadline){
                            return deadline.time;
                           });
   var undo_deadlines = deadlines.filter(function(deadline){
    return -1 == rmed_deadlines_times.indexOf(deadline.time);
   });
   return undo_deadlines;
  }

});
