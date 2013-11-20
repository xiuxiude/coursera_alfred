/*global todomvc */
'use strict';
app.controller('appCtrl', function AlfredCtrl($scope, alfredStorage, courseService, icon){
  
  $scope.deadlines = alfredStorage.getDeadlines();
  
  var isNew = alfredStorage.isNew();
  var isSignedIn = alfredStorage.isSignedIn();
  // var isOnLine = navigator.onLine;
  
  $scope.displayLoading = isSignedIn && isNew && isOnLine;
  $scope.displaySignIn = !isSignedIn && isOnLine;
  // $scope.displayOffline = !isOnLine;
  $scope.displayDeadlines = !isNew && isSignedIn;

  var removedDeadlines = $scope.removedDeadlines = alfredStorage.getRemoved();
  
  $scope.$watch('removedDeadlines', function (){
    if(!isNew){
      alfredStorage.setRemoved(removedDeadlines);
    
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

  $scope.restoreDeadline = function(deadline){
    for (var i =0; i < removedDeadlines.length; i++){
      if (courseService.isSameDeadline(deadline, removedDeadlines[i])) {
        removedDeadlines.splice(i,1);
        break;
      }
    }
  };
});
