var request = {url: 'https://www.coursera.org/*', name: 'maestro_user'};
var base_url = 'https://www.coursera.org/maestro/api/topic/list_my?user_id=';

chrome.cookies.get(request, function(cookie){
	var user = JSON.parse(decodeURIComponent(cookie.value));
	base_url +=	user.id;	
	console.log(base_url);
	$(document).ready(function(){
		$.getJSON(base_url, function(data){
			for (var i = 0; i < data.length; i++) {
				var courses = data[i].courses;
				for (var j = 0; j < courses.length; j++) {
					var name = $('<li>'+data[i].name+'</li>');
					var home_link = $('<a>see detial</a>');
					$(home_link).attr('href', courses[j].home_link);
					$('#mainPopup').append(name).append(home_link);
				}
			}
		});
	});
});