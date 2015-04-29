$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "/map/view",
        success: function (data) {
            $("#map svg").html(data);
            var eventId = 1;
            window.map = new Map(eventId);
            getAvailableSeats(eventId, window.map.setAvailableSeats, window.map);
        }
    });

});

// load available prices for seat
function getAvailableSeats(eventId, callback, scope) {
    $.ajax({
        type: "POST",
        url: "/map/availableSeats/"+eventId,
        success: function (data) {
            if(typeof callback === "function") {
                callback.call(scope, data.seats);
            }
        }
    });
}