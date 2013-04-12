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
          var user = JSON.parse(decodeURIComponent(cookie.value));
          deferred.resolve(user.id);
          localStorage.setItem("user_id", user.id)
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

    getPages: function(courses){
      var courses_promoises = new Array();
      courses.forEach(function(item){
        item.courses.forEach(function(i){
          courses_promoises.push(i);
        })
      });
      courses_promoises.filter(function(item){
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
      console.log(pages);
      var deferred = $q.defer();
      var events = pages.map(function(item){
        console.log(item);//works prop
        var raw_html = item.html;
        console.log(raw_html);
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