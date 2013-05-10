/*global todomvc */
'use strict';
app.controller('appCtrl', function AlfredCtrl($scope, alfredStorage) {
  
  $scope.deadlines = alfredStorage.getDeadlines();
  $scope.new = alfredStorage.isNew();

  var removedDeadlines = $scope.removedDeadlines = alfredStorage.getRemoved();
  
  $scope.$watch('removedDeadlines', function () {
    alfredStorage.putRemoved(removedDeadlines);
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
