app.filter('from_now', function()
{
    return function(timeString)
    {
        return  moment(timeString, "YYYYMMDDTHHmmssZ").fromNow();
    }
});
