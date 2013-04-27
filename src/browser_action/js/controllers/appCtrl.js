/*global todomvc */
'use strict';

app.controller('appCtrl', function AlfredCtrl($scope, courseService) {
	var deadlines = localStorage["deadlines"];
	$scope.deadlines = (typeof deadlines == "undefined")?[]:JSON.parse([deadlines]);
});
