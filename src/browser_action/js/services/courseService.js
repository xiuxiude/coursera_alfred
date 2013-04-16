'use strict';

app.factory('courseService', function ($http, $q) {
  var base_url = "https://www.coursera.org/maestro/api/topic/list_my?user_id=";
  
  var getUserId = function(){
    var request = {url: 'https://www.coursera.org/*', name: 'maestro_user'};
    
    var deferred = $q.defer();
    var user_id;
    if(user_id = localStorage.getItem("user_id")) {
      deferred.resolve(user_id);
    } else {
      chrome.cookies.get(request, function(cookie){
        var user = JSON.parse(decodeURIComponent(cookie.value));
        deferred.resolve(user.id);
        localStorage.setItem("user_id", user.id)
      });
    }
    return deferred.promise;
  };

  var getAllCourses = function(user_id){
    var url = base_url + user_id;
    return $http.get(url)
                .then(function(response){
                  return response.data;
                })
  };

  var getPages = function(courses){
    var courses_promoises = courses.filter(function(item){
      return item.courses[0].home_link;
    }).map(function(item){
      var deferred = $q.defer();
      item["class_link"] = item.courses[0].home_link;
      $http.get(item.class_link)
           .then(function(response){
             item["html"] = response.data;
             deferred.resolve(item);
           });
      return deferred.promise;
    });
    return $q.all(courses_promoises);
  };

  var getEvents = function(pages){
    var container = {};
    container.events = {
      deadlines: [],
      new_lectures: []
    };

    container.courses_with_calendar = pages.map(function(item){
      var course_name = item.name;
      var raw_html = item.html;
      var body = '<div id="body-mock">' +
                 raw_html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, '') +
                 '</div>';

      var $upcomingItems = $(body).find('.course-overview-upcoming-category'); 
      var deadlines = $upcomingItems.slice(0, $upcomingItems.length - 1).find('.course-overview-upcoming-item').toArray();
      var new_lectures = $upcomingItems.last().find('.course-overview-upcoming-item').toArray();


      deadlines.map(function(item){
        item.time = new Date(item.children[2].innerHTML);
        item.name = course_name;
        return item;
      });

      item["deadlines"] = deadlines;
      item["new_lectures"] = new_lectures;

      container.events.deadlines = container.events.deadlines.concat(deadlines);
      container.events.new_lectures = container.events.new_lectures.concat(new_lectures);

      if($(body).find(".icon-calendar").length > 0) {
        item["calendar"] = item["class_link"] + "calendar/ics";
      }
      return item;
    }).filter(function(item){
      return (item["deadlines"].length > 0 || item["new_lectures"] > 0);
    });
    return container;
  };
  
  return {
    getCourses: function(){
      var deferred = $q.defer();
      getUserId().then(
                getAllCourses
              )
              .then(
                getPages
              )
              .then(function(pages){
                //console.log(pages);
                var container = getEvents(pages);
                console.log(container);
                var events = container.events;
                deferred.resolve(events);
              })
      return deferred.promise;
    }
  }
});