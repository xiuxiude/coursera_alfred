app.filter('hide_deadline', function()
{
    return function(deadline)
    {
     var new_deadlines = JSON.parse(localStorage['events']).deadlines;
     
     var rmed_deadlines = JSON.parse(localStorage['rmed_deadlines']).map(function(deadline){
      deadline['done'] = false;
      return deadline;
     }).map(function(deadline){
      if(new_deadlines.index(deadline) === -1){
       return deadline;
      }
     })
     
     return rmed_deadlines;
    }
});