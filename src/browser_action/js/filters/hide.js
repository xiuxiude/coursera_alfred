app.filter('hide', function()
{
    return function(deadlines, removedDeadlines)
    { 
      var removedDeadlineHtmls = removedDeadlines.map(function(removedItem){
        return removedItem.html;
      });
      
      return deadlines.filter(function(deadline){
        return (removedDeadlineHtmls.indexOf(deadline.html) === -1);
      });
    }
});
