/*global todomvc */
'use strict';
app.controller('appCtrl', function AlfredCtrl($scope, alfredStorage) {
  
  $scope.deadlines = alfredStorage.getDeadlines();
  $scope.new = alfredStorage.isNew();
  $scope.isSignedIn = alfredStorage.isSignedIn();

  var removedDeadlines = $scope.removedDeadlines = alfredStorage.getRemoved();
  
  $scope.$watch('removedDeadlines', function (){
    console.log("fired");
    alfredStorage.putRemoved(removedDeadlines);
  }, true);

  $scope.signIn = function(){
    chrome.tabs.create({'url': 'https://www.coursera.org/account/signin'})
  };

  $scope.openDeadlineInNewTab = function(deadline){
    chrome.tabs.create({'url': deadline.link});
  };
  
  $scope.removeDeadline = function(deadline){
    removedDeadlines.push(deadline);
  };

  //$scope.restoreDeadline = alfredStorage.restoreDeadline;
  
  $scope.restoreDeadline = function(index){
    removedDeadlines.splice(index, 1);
  }
});
