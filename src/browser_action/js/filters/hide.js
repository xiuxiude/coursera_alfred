app.filter('hide', function()
{
    return function(deadlines, removedDeadlines)
    { 
      var removedDeadlineHtmls = removedDeadlines.map(function(removedItem){
        return removedItem.html;
      });
      
      return deadlines.filter(function(deadline){
        var target = deadline.html;
        var result = false;
        for(var i = 0; i < removedDeadlineHtmls.length; i++){
         var removedItemHtml = removedDeadlineHtmls[i];
         var temp = ((removedItemHtml.length === target.length) && (removedItemHtml === target));
         result = result || temp;
         if(result){
          break;
         }
        }
        return !result;
      });
    }
});
