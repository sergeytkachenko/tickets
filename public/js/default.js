$(document).ready(function () {

    $.ajax({
        type: "POST",
        url: "/map/view",
        success: function (data) {
            $("#map svg").html(data);

            var map = new Map();
        }
    });
});
