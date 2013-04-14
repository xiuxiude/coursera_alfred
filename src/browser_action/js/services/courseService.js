'use strict';

app.factory('courseService', function ($http, $q) {
  var request = {url: 'https://www.coursera.org/*', name: 'maestro_user'};
  var base_url = "https://www.coursera.org/maestro/api/topic/list_my?user_id=";
  return {
    getUserId: function(){
      var deferred = $q.defer();
      var user_id;
      if(user_id = localStorage.getItem("user_id")) {
        deferred.resolve(user_id);
      } else {
        chrome.cookies.get(request, function(cookie){
          if(cookie){
            var user = JSON.parse(decodeURIComponent(cookie.value));
            deferred.resolve(user.id);
            localStorage.setItem("user_id", user.id)
          } else window.alert('Please log in coursera first');
        });
      }
      return deferred.promise;
    },
    
    getAllCourses: function(user_id){
      var url = base_url + user_id
      return $http.get(url)
                  .then(function(response){
                    return response.data;
                  })
    },

    getAllCoursesOut: function(courses){
      var deferred = $q.defer(),
          all_courses =  new Array();
      courses.forEach(function(item){
        item.courses.forEach(function(i){
          i.name = item.name;
          all_courses.push(i);
        })
      });
      deferred.resolve(all_courses);
      return deferred.promise;
    },

    getPages: function(courses){
      var courses_promoises = courses.filter(function(item){
        return item.home_link;
      }).map(function(item){
        var deferred = $q.defer();
        item["class_link"] = item.home_link + "class/index";
        $http.get(item.class_link)
             .then(function(response){
               item["html"] = response.data;
               deferred.resolve(item);
             });
        return deferred.promise;
      });
      return $q.all(courses_promoises);
    },

    getEvents: function(pages){
      var deferred = $q.defer();
      var events = pages.map(function(item){
        var raw_html = item.html;
        var body = '<div id="body-mock">' +
                   raw_html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, '') +
                   '</div>';
        var events = $(body).find('.course-overview-upcoming-category')
                            .first()
                            .find('.course-overview-upcoming-item');
        item["message"] = events;
        return item;
      }).filter(function(item){
        return item["message"].length > 0;
      });
      console.log(events);
      deferred.resolve(events);
      return deferred.promise;
    }
  }
});