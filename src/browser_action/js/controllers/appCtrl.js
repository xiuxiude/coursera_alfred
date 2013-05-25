/*global todomvc */
'use strict';
app.controller('appCtrl', function AlfredCtrl($scope, alfredStorage, courseService, icon){
  
  $scope.deadlines = alfredStorage.getDeadlines();
  
  var isNew = alfredStorage.isNew();
  var isSignedIn = alfredStorage.isSignedIn();
  var isOnLine = navigator.onLine;
  
  $scope.displayLoading = isSignedIn && isNew && isOnLine;
  $scope.displaySignIn = !isSignedIn && isOnLine;
  $scope.displayOffline = !isOnLine;
  $scope.displayDeadlines = !isNew && isSignedIn;

  var removedDeadlines = $scope.removedDeadlines = alfredStorage.getRemoved();
  
  $scope.$watch('removedDeadlines', function (){
    if(!isNew){
      alfredStorage.putRemoved(removedDeadlines);
    
      //update the badge count when user remove deadline
      icon.updateIcon();
    }
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
  };
  
  $scope.update = courseService.updateData;
});
