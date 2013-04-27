app.filter('from_now', function()
{
    return function(dateString)
    {
        return moment(dateString).fromNow();
    }
});
