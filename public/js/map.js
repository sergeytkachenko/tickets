var Map = function (eventId) {
    var self = this;
    var mouse = {x: 0, y: 0};

    this.svg = $("#map svg");
    this.tooltip = $("#map .tooltip-ticket");
    this.reservUrl = "/reservation/seat/";
    this.reservClearUrl = "/reservation/seatClear/";
    this.checkReservation = "/reservation/check/";
    this.selfPurchased = "/maps/getSelfPurchased/"; // все зарезервированые собой места
    this.timeOut = "/reservation/timeout/";
    this.prevLocation = "/order/preview/"+eventId;

    this.intervalTimeout = 14 * 1000; // 14 min
    this.zoomDefault = 0.1;
    this.scale = 1;

    this.defaultOpacity = 0.7;
    this.hoverFill = "#000000"; // при наведении
    this.reservedFill = "#000000"; // при резервации
    this.availableFill = "#3C863C"; // места, которые продаются

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
                self.clearReservation(this);
            } else {
                self.setReservation(this);
                self.setPurchased(this, "me");
            }
        });
        $(".zoom.plus").on("click", function () {
            self.zoom(self.zoomDefault);
        });
        $(".zoom.minus").on("click", function () {
            self.zoom(-self.zoomDefault);
        });
        $('#map').on('mousewheel', function(event) {
            var scale = event.deltaY > 0 ? self.zoomDefault : - self.zoomDefault;
            self.zoom(scale);
        });
        this.initDrag();


        $(this.svg).find("[opacity]").attr("style", "opacity:0.1")
    }

    this.initDrag = function () {
        $(this.svg).draggable();
    }

    this.zoom = function (scale) {
        if(this.scale + scale < 1) {return;}
        this.scale += scale;
        $(this.svg).css({
            "transform" : "scale(" + this.scale + ")"
        });
    }

    this.setBgColor = function (el) {
        $(el).attr("old-fill", $(el).attr("fill"));
        $(el).attr("fill", self.hoverFill).css('opacity', 1);
    }
    this.clearBgColor = function (el) {
        $(el).attr("fill", $(el).attr("old-fill")).css('opacity', this.defaultOpacity);
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
    this.setPurchased = function (el, cls) {
        cls = cls? cls + " purchased" : "purchased";
        $(el).attr("class", cls);
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
            //$(obj).attr("fill", self.availableFill);
            $(obj).attr("opacity", 1);
            if(!free) {
                $(obj).attr("fill", self.hoverFill);
            }
        }

        self.initEvent();
        self.setSelfPurchased();
    }

    /**
     * Помечаем уже зарезервированые ранее места этим пользователем
     */
    this.setSelfPurchased = function () {
        var self = this;
        $.ajax ({
            type: "POST",
            url: self.selfPurchased+eventId,
            success: function (data) {
                if(data && data.success) {
                    $.each(data.seats, function (key, obj) {
                        var el = $(self.svg).find("[data-id="+obj.id+"]");
                        self.setPurchased(el, 'me');
                    })
                    return;
                }
                if(data.error) {alert(data.error); return;}
                alert("Произошла не предвиденная ошибка, поробуйте обновить страницу...");
            }
        });
    }

    this.setReservation = function (el) {
        var id = $(el).attr("data-id");
        if(!id) {return;}
        $.ajax ({ // резервация места, что-бы никто другой не смог купить
            type: "POST",
            url: self.reservUrl+id+"?eventId="+eventId,
            success: function (data) {
                if(data && data.success && !data.error) {
                    return;
                }

                self.clearPurchased(el);
                // если место было зарезервировано ранее то отключаем клик на него
                $(el).attr('data-free', false).off('click');
                self.setPurchased(el);

                if(data.error) {alert(data.error); return;}
                alert("Произошла не предвиденная ошибка, поробуйте позже...");
            }
        });
    }

    this.clearReservation = function (el) {
        var id = $(el).attr("data-id");
        if(!id) {return;}
        $.ajax ({ // отмена резервации места
            type: "POST",
            url: self.reservClearUrl+id+"?eventId="+eventId,
            success: function (data) {
                console.log(data);
            }
        });
    }

    // Проверка на доступность мест, не купляет ли кто другой эти места сейчас?
    this.checkAvailability = function () {
        // выбираем выбранные места и проверяем их доступность на backend
        var idList = [];
        $(this.svg).find(".purchased").each(function () {
            var id = $(this).attr("data-id");
            idList.push(id);
        });
        if(idList.length===0) {
            alert('Для покупки билета необходимо выбрать место');
            return;
        };
        $.ajax ({ // проверка доступности выбранных мест, что-бы их купить
            type: "POST",
            url: self.checkReservation + eventId,
            data : {idList : idList.join(",")},
            success: function (data) {
                if(data && data.success) {
                    location.href = self.prevLocation;
                    return;
                }
                if(data.error) {alert(data.error); return;}
                alert("Произошла не предвиденная ошибка, поробуйте позже...");
            }
        });
    }

    this.checkTimeout = function () {
        self.checkTimeout.interval = setInterval(function () {
            $.ajax ({ // проверка истечения таймаута
                type: "POST",
                url: self.timeOut+eventId,
                success: function (data) {
                    if(data && data.isTimeout) {
                        alert(data.msg);
                        location.reload();
                        clearInterval(self.checkTimeout.interval);
                        return;
                    }
                }
            });
        }, self.intervalTimeout);
    }

    this.checkTimeout(); // регистрируем проверку таймаута для резервации билетов

    // слушает позицию курсора
    document.addEventListener('mousemove', function(e){
        mouse.x = e.clientX || e.pageX;
        mouse.y = e.clientY || e.pageY
    }, false);
}