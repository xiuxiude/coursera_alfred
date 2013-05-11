app.filter('hide', function()
{
    return function(deadlines, removedDeadlines)
    { 
      var removedDeadlineLinks = removedDeadlines.map(function(removedItem){
        return removedItem.link;
      });
      
      return deadlines.filter(function(deadline){
        return (removedDeadlineLinks.indexOf(deadline.link) === -1);
      });
    }
});
