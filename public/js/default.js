$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "/maps/view",
        success: function (data) {
            $("#map svg").html(data);
            window.map = new Map(eventId);
            getAvailableSeats(eventId, window.map.setAvailableSeats, window.map);
        }
    });
    $(".fakeLoader").fakeLoader({
        timeToHide: 10 * 1000,
        bgColor:"#2ecc71",
        spinner:"spinner1"
    });
});

// load available prices for seat
function getAvailableSeats(eventId, callback, scope) {
    $.ajax({
        type: "POST",
        url: "/maps/availableSeats/"+eventId,
        success: function (data) {
            if(typeof callback === "function") {
                $('.fakeLoader').fadeOut(1000);
                callback.call(scope, data.seats);
            }
        }
    });
}