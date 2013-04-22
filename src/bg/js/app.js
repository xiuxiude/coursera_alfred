'use strict';

var app = angular.module('app', []);

// chrome.cookies.getAll({}, function(cookies){
//   var user_data = JSON.parse(decodeURIComponent(cookies[0].value));
//   
//   $.getJSON("https://www.coursera.org/maestro/api/topic/list_my?user_id=" + user_data.id, function(data){
//     var enrolled = _.filter(data, function(item){return item.display;});
//     console.log(enrolled);
//   });
//   
//   $.get("https://class.coursera.org/proglang-2012-001/assignment/index", function(data){
//     console.log(data);
//   });
// 
// 
// });
