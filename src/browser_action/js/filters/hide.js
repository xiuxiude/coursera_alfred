app.filter('hide', function(courseService)
{
    return function(deadlines, removedDeadlines)
    { 
      return deadlines.filter(function(deadline){
        var result = false;
        for(var i = 0; i < removedDeadlines.length; i++){
         var temp = courseService.isSameDeadline(deadline, removedDeadlines[i]);
         result = result || temp;
         if(result){
          break;
         }
        }
        return !result;
      });
    }
});
