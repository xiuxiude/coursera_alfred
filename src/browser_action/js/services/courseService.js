'use strict';

app.factory('courseService', function ($http, $q) {
  var request = {url: 'https://www.coursera.org/*', name: 'maestro_user'};
  var base_url = "https://www.coursera.org/maestro/api/topic/list_my?user_id=";
  return {
    getAllCourses: function(user_id){
      var url = base_url + user_id
      return $http.get(url)
                  .then(function(response){
                    return  response.data;
                  })
    },
    
    getUserId: function(){
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
    },

    getNameAndHome_Link: function(data){
      var courses_links = new Array(),
          deferred = $q.defer();
      data.forEach(function(item){
        courses_links.push(
        {
          'course_name' : item.name,
          'home_link' : item.courses[0].home_link
        });
      });
      deferred.resolve(courses_links);
      return deferred.promise;
    },

    getPages: function(courses_links){
      var pages = new Array(),
          deferred = $q.defer();
      courses_links.forEach(function(pair){
        $http.get(pair.home_link)
             .then(function(response){
              pages.push(
              {
                'course_name' : pair.course_name,
                'home_page' : response.data
              });
             })
      });
      deferred.resolve(pages);
      return deferred.promise;
    },

    getEvents: function(pages){
      var deferred = $q.defer(),
          whole_events = new Array();
      pages.forEach(function(item){
        console.log(item);//don't display on screen! what's going on!!!!!
        var events = $(item.home_page).find('.course-page-sidebar')
                                           .find('.course-overview-upcoming-category')
                                           .first()
                                           .find('.course-overview-upcoming-item');
        events.forEach(function(evt){
          whole_events.push(
          {
            "event_name" : $(evt).find('a').text(),
            "event_time" : $(evt).find('time').text()
          });
        });
      });
      deferred.resolve(whole_events);
      return deferred.promise;
    }
  }
});