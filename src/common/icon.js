'use strict';

app.factory('icon', function (alfredStorage) {
  var GRAY_ICON_PATH = "/icons/icon19gray.png";
  var ICON_PATH = "/icons/icon19.png";
  var GRAY_BACKGROUND_COLOR = [190, 190, 190, 230];
  var BACKGROUND_COLOR = [208, 0, 24, 255];
  
  var NOT_SIGN_IN_TEXT = "?";
  var LOADING_TEXT = "..";

  var setIcon = function(img, color, text){
    chrome.browserAction.setIcon({path: img});
    chrome.browserAction.setBadgeBackgroundColor({color: color});
    chrome.browserAction.setBadgeText({text: text});
  };
  
  var initIcon = function(){
    setIcon(ICON_PATH, BACKGROUND_COLOR, LOADING_TEXT);
  };
  
  var updateIcon = function(){
    var len = alfredStorage.getDeadlines().length - alfredStorage.getRemoved().length;
    if (!alfredStorage.isSignedIn()) {
      setIcon(GRAY_ICON_PATH, GRAY_BACKGROUND_COLOR, NOT_SIGN_IN_TEXT)
    } else {
      chrome.browserAction.setBadgeText({
        text: len != "0" ? len.toString() : "" 
      });
    }
  };
  
  return {
    initIcon: initIcon,
    updateIcon: updateIcon
  }
});
