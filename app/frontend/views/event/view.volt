<div class="description-event" style="margin-bottom: 20px;">
    <a href="/representation/view/{{ event.Representation.id }}" class="btn btn-default" role="button">
        <i class="fa fa-arrow-left"></i> Все даты представлений
    </a>
</div>
<h2 style="font-family:Tahoma,sans-serif;font-size:1.2em;font-weight:600;text-transform:uppercase;color:#337ab7;">
    {{ event.Representation.title }}
    <span style="float: right;font-size:0.95em;">
       Начало {{ display_when(event.date) }}
    </span>
</h2>
<div id="map">
    <div data-id="svg"></div>
    <div class="tooltip-ticket">text</div>
    <a class="zoom plus glyphicon glyphicon-plus"></a>
    <a class="zoom minus glyphicon glyphicon-minus"></a>
</div>
<div class="description-event">

</div>
<div class="navigation">
    <ul class="colors"></ul>
    <p style="text-align: right">
        <button class="btn btn-large btn-danger" style="margin-top:4%;" type="button" onclick="window.map.checkAvailability();">
            Продолжить <i class="fa fa-angle-double-right"></i></button>
    </p>
</div>
<script>window.eventId = '{{ event.id }}';</script>
<script src="/js/map.js"></script>
<script src="/js/default.js"></script>
