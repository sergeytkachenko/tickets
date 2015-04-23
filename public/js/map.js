var Map = function () {
    var self = this;
    var mouse = {x: 0, y: 0};
    this.fill = "#ff0000";
    this.svg = $("#map svg");
    this.tooltip = $("#map .tooltip-ticket");
    this.initEvent = function () {
        $(this.svg).find("path[data-id], polygon[data-id]").hover(function () {
            self.showTooltip();
            self.setBgColor(this)
        }, function () {
            self.clearBgColor(this);
            self.hideTooltip();
        })
    }

    this.setBgColor = function (el) {
        $(el).attr("old-fill", $(el).attr("fill"));
        $(el).attr("fill", self.fill);
    }
    this.clearBgColor = function (el) {
        $(el).attr("fill", $(el).attr("old-fill"));
    }
    this.showTooltip = function () {
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

    this.initEvent();
    document.addEventListener('mousemove', function(e){
        mouse.x = e.clientX || e.pageX;
        mouse.y = e.clientY || e.pageY
    }, false);
}