chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);

    // ----------------------------------------------------------
    // This part of the script triggers when page is done loading
    console.log("Hello. This message was sent from scripts/inject.js");
    // ----------------------------------------------------------

  }
  }, 10);
});

var $weeklyLectures = $('.course-item-list-header');

$weeklyLectures.find('h3')
.append('<button class="alfred">download this week</button>');

$(document).on("click", "button.alfred", function (e) {
  var $header = $(this).closest('.course-item-list-header')
  e.stopPropagation();
  var $courses = $($header).next();
  $courses.find('.course-lecture-item-resource a')
  .each(function(index, elem){
    setTimeout(function(){
      elem.click();
    }, 1000);
  });
});

