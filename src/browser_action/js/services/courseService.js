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

    getEvents: function(courses_links){
      return courses_links;
    },

    getNameAndHome_Link: function(data){
      var courses_links = [],
          deferred = $q.defer();
      data.forEach(function(i){
        courses_links.push({
          'course_name' : i.name,
          'home_link' : i.courses[0].home_link
        });
      });
      deferred.resolve(courses_links);
      return deferred.promise;
    }
  }
});