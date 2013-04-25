/*global todomvc */
'use strict';

app.controller('bgCtrl', function AlfredCtrl($scope, courseService) {
	var setLocal = function(){
		courseService.getCourses().then(function(events){
			console.log("fired inside of getCourses()");
			console.log(events);
			localStorage.setItem("deadlines", JSON.stringify(events.deadlines));
		});
	};

	setLocal();//initialize

	var delay = 0.1;

	chrome.alarms.create("scheduleRequest", {periodInMinutes: delay});

	chrome.alarms.onAlarm.addListener(function(alarm){
		if(alarm.name = "scheduleRequest"){
			console.log("fired out of setLocal()");
			setLocal();
		}
	})
});
