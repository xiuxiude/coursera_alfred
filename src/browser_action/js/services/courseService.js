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
    var events = {
      deadlines: [],
      courses: [],
    };
    var courses = pages.map(function(item){
      var raw_html = item.html;
      var body = '<div id="body-mock">' +
                 raw_html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, '') +
                 '</div>';

      var $upcomingItems = $(body).find('.course-overview-upcoming-category')

      var deadlines = $upcomingItems.eq(0).find('.course-overview-upcoming-item').toArray();
      var new_lectures = $upcomingItems.eq(1).find('.course-overview-upcoming-item').toArray();
      
      item["new_lectures"] = new_lectures;

      if($upcomingItems.find(".icon-calendar").length > 0) {
        item["calendar"] = item["class_link"] + "calendar/ics";
      }
      
      deadlines.forEach(function(deadline){
        deadline.time = new Date(deadline.children[2].innerHTML);
        deadline.course = item;
      })
      
      if(deadlines.length > 0) {
        console.log(deadlines);
        events.deadlines = events.deadlines.concat(deadlines);
      }

      return item;
    }).filter(function(item){
      return item["new_lectures"].length > 0;
    });
    
    events.courses = courses;
    return events;
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
                var events = getEvents(pages);
                console.log(events);
                deferred.resolve(events);
              })
      return deferred.promise;
    }
  }
});