/*global todomvc */
'use strict';
app.controller('appCtrl', function AlfredCtrl($scope, alfredStorage, courseService){
  
  $scope.deadlines = alfredStorage.getDeadlines();
  $scope.new = alfredStorage.isNew();
  $scope.isSignedIn = alfredStorage.isSignedIn();
  $scope.isOnLine = navigator.onLine;

  var removedDeadlines = $scope.removedDeadlines = alfredStorage.getRemoved();
  
  $scope.$watch('removedDeadlines', function (){
    alfredStorage.putRemoved(removedDeadlines);
    
    //update the badge count when user remove deadline
    courseService.updateIcon();
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


  $scope.restoreDeadline = function(index){
    removedDeadlines.splice(index, 1);
  }
});
