<h2>{{ event.Representation.title }}, начало {{ display_when(event.date) }}</h2>
<div class="description-event">

</div>
<div id="map">
    <svg version="1.1" id="_x2014_лой_1" xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="595px" height="562.835px"
         viewBox="0 0 595 562.835" enable-background="new 0 0 595 562.835" xml:space="preserve"></svg>
    <div class="tooltip-ticket">text</div>
    <a class="zoom plus glyphicon glyphicon-plus"></a>
    <a class="zoom minus glyphicon glyphicon-minus"></a>
</div>
<div class="description-event">

</div>
<div class="navigation">
    <ul class="colors">
        {% for color in colors %}
            <li><span style="background-color: {{ color.SeatColors.hex }};"></span> - {{ color.price }} грн</li>
        {% endfor %}
    </ul>
    <p style="text-align: right">
        <button class="btn btn-large btn-primary" type="button" onclick="window.map.checkAvailability();">
            Продолжить <i class="fa fa-angle-double-right"></i></button>
    </p>
</div>
<script>window.eventId = '{{ event.id }}';</script>
<script src="/js/map.js"></script>
<script src="/js/default.js"></script>
