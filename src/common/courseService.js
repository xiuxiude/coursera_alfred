'use strict';

app.factory('courseService', function ($http, $q, alfredStorage) {
  var base_url = "https://www.coursera.org/maestro/api/topic/list_my?user_id=";
  
  var getUserId = function(){
    var request = {url: 'https://www.coursera.org/*', name: 'maestro_user'};
    
    var deferred = Q.defer();
    var user_id;
    if(user_id = alfredStorage.getUserID() ) {
      deferred.resolve(user_id);
    } else {
      chrome.cookies.get(request, function(cookie){
        if(cookie){
          var user_id = JSON.parse(decodeURIComponent(cookie.value)).id;
          if(user_id){
            alfredStorage.signIn();
            alfredStorage.setUserID(user_id);
            deferred.resolve(user_id);
          } else{
          deferred.reject();
          }
        } else{
          deferred.resolve();
        }
      });
    }
    return deferred.promise;
  };

  var getAllCourses = function(user_id){
    var url = base_url + user_id;
    return $.get(url)
                .then(function(response){
                  return response;
                })
  };

  var getPages = function(courses){
    var courses_promoises = courses.filter(function(item){
      return item.courses[0].home_link;
    }).map(function(item){
      var deferred = Q.defer();
      item["class_link"] = item.courses[0].home_link;
      item["home_link"] = item["class_link"] + "class/index";
      $.get(item.home_link)
           .then(function(response){
             item["html"] = response;
             deferred.resolve(item);
           });
      return deferred.promise;
    });
    return Q.all(courses_promoises);
  };


  var getEvents = function(pages){
    var events = {
      deadlines: [],
      courses: [],
    };
    var courses = pages.map(function(item){
      var raw_html = item.html;
      var body = '<div id="body-mock">' +
                 raw_html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, '') +
                 '</div>';

      var $sidebar = $(body).find('.course-page-sidebar');

      // deadlines and new lectures are separated by a <hr>

      var $hr = $sidebar.find("hr");
      var $deadlineCcontainer = $hr.prevAll('.course-overview-upcoming-category')
      var $newLecturesContainer = $hr.nextAll('.course-overview-upcoming-category')
      
      var deadlines = $deadlineCcontainer
                      .find('.course-overview-upcoming-item')
                      .toArray();
      var newLectures = $newLecturesContainer
                        .find('.course-overview-upcoming-item')
                        .toArray();
      
      item["new_lectures"] = newLectures;

      if($sidebar.find(".icon-calendar").length > 0) {
        item["calendar"] = item["class_link"] + "calendar/ics";
      }
      
      var deadlineObjects = deadlines.map(function(deadline){
        var $deadline = $(deadline);
        var $deadlineItem = $deadline.find('time');
        
        // use momentjs to parse the unstandard date format
        var date = moment(
          $deadlineItem.data("event-times").split('/')[1],
          "YYYYMMDDTHHmmssZ"
        );

        var object  = { 
          "html": $deadline.html(),
          "title": $deadlineItem.data("event-title"),
          "link": $deadlineItem.data("event-location"),
          "description": $deadlineItem.data("event-description"),
          "time": date,
          "course": {
            "name": item.name,
            "icon": item.small_icon
          }
        };
        return object;
      });

      
      if (deadlineObjects.length > 0) {
        events.deadlines = events.deadlines.concat(deadlineObjects);
      }

      return item;
    }).filter(function(item){
      return item["new_lectures"].length > 0;
    });
    
    // events.courses = courses;
    return events;
  };
  
  var getCourses =  function(){
    var deferred = Q.defer();
    getUserId().then(
              getAllCourses
            , function(reason){
                alfredStorage.signOut();
                deferred.reject(reason);
              } 
            )
            .then(
              getPages, function(reason){
                deferred.reject(reason);
              }
            )
            .then(function(pages){
              var events = getEvents(pages);
              deferred.resolve(events);
            })
    return deferred.promise;
  };

  var initIcon = function(){
    chrome.browserAction.setIcon({path: "/icons/icon19.png"});
    chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
    chrome.browserAction.setBadgeText({text:".."});
  };
  
  var updateIcon = function(){
    var len = alfredStorage.getDeadlines().length - alfredStorage.getRemoved().length;
    if (!alfredStorage.isSignedIn()) {
      chrome.browserAction.setIcon({path: "/icons/icon19gray.png"});
      chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
      chrome.browserAction.setBadgeText({text:"?"});
    } else {
      chrome.browserAction.setBadgeText({
        text: len != "0" ? len.toString() : "" 
      });
    }
  };
  
  var updateData = function(){
    alfredStorage.reNew();
    initIcon();
    getCourses().then(function(events){
      if(events){
        alfredStorage.setDeadlines(events.deadlines);
        alfredStorage.removeExpiredDeadlines();
        alfredStorage.unNew();
        updateIcon();
      }
    }, function(reason){
      alfredStorage.unNew();
      updateIcon();
    });
  }
  
  return {
    updateData: updateData,
    updateIcon: updateIcon
  }
});
