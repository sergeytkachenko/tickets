var Map = function () {
    var self = this;
    var mouse = {x: 0, y: 0};

    this.svg = $("#map svg");
    this.tooltip = $("#map .tooltip-ticket");
    this.reservUrl = "/reservation/seat/";

    this.hoverFill = "#000000"; // при наведении
    this.availableFill = "#006600"; // места, которые продаются

    this.initEvent = function () {
        $(this.svg).find("path[data-id][data-free='true'], polygon[data-id][data-free='true']").hover(function () {
            self.showTooltip(this);
            self.setBgColor(this)
        }, function () {
            self.clearBgColor(this);
            self.hideTooltip();
        }).on("click", function() {
            var cls = $(this).attr("class");
            if(cls) {
                self.clearPurchased(this);
            } else {
                self.setReservation(this);
                self.setPurchased(this);
            }
        });

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
    this.setPurchased = function (el) {
        $(el).attr("class", "purchased");
    }
    this.clearPurchased = function (el) {
        $(el).removeAttr("class");
    }
    // устанавливает свободные места, которые можно купить
    this.setAvailableSeats = function (data) {
        for(var i in data) {
            var seat = data[i],
                seatId = seat.id,
                price = seat.price,
                title = seat.title,
                free = seat.free;
            var obj = $(self.svg).find("[data-id="+seatId+"]");
            $(obj).attr("data-free", free);
            $(obj).attr("title", title).attr("data-price", price);
            $(obj).attr("fill", self.availableFill);
            if(!free) {
                $(obj).attr("fill", self.hoverFill);
            }
        }

        self.initEvent();
    }
    this.setReservation = function (el) {
        var id = $(el).attr("data-id");
        if(!id) {return;}
        $.ajax ({ // резервация места, что-бы никто другой не смог купить
            type: "POST",
            url: self.reservUrl+id,
            success: function (data) {
                if(data && data.success) {
                    console.log(data);
                    return;
                }
                self.clearPurchased(el);
                if(data.error) {alert(data.error); return;}
                alert("Произошла не предвиденная ошибка, поробуйте позже...");
            }
        });
    }

    // слушает позицию курсора
    document.addEventListener('mousemove', function(e){
        mouse.x = e.clientX || e.pageX;
        mouse.y = e.clientY || e.pageY
    }, false);
}