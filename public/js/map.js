var Map = function () {
    var self = this;
    var mouse = {x: 0, y: 0};

    this.svg = $("#map svg");
    this.tooltip = $("#map .tooltip-ticket");

    this.hoverFill = "#000000"; // при наведении
    this.availableFill = "#006600"; // места, которые продаются

    this.initEvent = function () {
        $(this.svg).find("path[data-id][data-price], polygon[data-id][data-price]").hover(function () {
            self.showTooltip(this);
            self.setBgColor(this)
        }, function () {
            self.clearBgColor(this);
            self.hideTooltip();
        })
    }

    this.setBgColor = function (el) {
        $(el).attr("old-fill", $(el).attr("fill"));
        $(el).attr("fill", self.hoverFill);
    }
    this.clearBgColor = function (el) {
        $(el).attr("fill", $(el).attr("old-fill"));
    }
    this.showTooltip = function (el) {
        $(self.tooltip).text($(el).attr("title"));
        $(self.tooltip).css({
            left: mouse.x + 10,
            top: mouse.y + 10,
            display: "block"
        })
    }
    this.hideTooltip = function () {
        $(self.tooltip).css({
            display: "none"
        })
    }

    // устанавливает свободные места, которые можно купить
    this.setAvailableSeats = function (data) {
        for(var i in data) {
            var seat = data[i],
                seatId = seat.id,
                price = seat.price,
                title = seat.title;
            var obj = $(self.svg).find("[data-id="+seatId+"]");
            $(obj).attr("title", title).attr("data-price", price);
            $(obj).attr("fill", self.availableFill)
        }

        self.initEvent();
    }

    // слушает позицию курсора
    document.addEventListener('mousemove', function(e){
        mouse.x = e.clientX || e.pageX;
        mouse.y = e.clientY || e.pageY
    }, false);
}