app.filter('hide', function()
{
    return function(deadlines, removedDeadlines)
    { 
      var removed = (removedDeadlines.ignored).concat(removedDeadlines.completed);

      var removedDeadlineLinks = removed.map(function(removedItem){
        return removedItem.link;
      });
      
      return deadlines.filter(function(deadline){
        return (removedDeadlineLinks.indexOf(deadline.link) === -1);
      });
    }
});
