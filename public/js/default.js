$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "/map/view",
        success: function (data) {
            $("#map svg").html(data);
            var map = new Map();
            getAvailableSeats(map.setAvailableSeats, map);
        }
    });

});

// load available prices for seat
function getAvailableSeats(callback, scope) {
    $.ajax({
        type: "POST",
        url: "/map/availableSeats",
        success: function (data) {
            if(typeof callback === "function") {
                callback.call(scope, data.seats);
            }
        }
    });
}