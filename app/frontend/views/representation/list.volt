<div>
    {% for representation in representations %}
    {#<div class="row event-short-container">#}
        {#<div class="col-md-8" style="padding-left: 0">#}
            {#<div class="event-image">#}
                {#<img src="{{ representation.img }}" alt="{{ representation.title|e }}">#}
            {#</div>#}
        {#</div>#}
        {#<div class="col-md-4 event-short-details">#}
            {#<h3><a href="/representation/view/{{  representation.id }}">{{ representation.title|e }}</a></h3>#}
            {#<p>{{ representation.description }}</p>#}
            {#<div class="nearest-event">#}
                {#<div>Ближайшая дата проведения:</div>#}
                {#<div>#}
                    {#{% if representation.getNearestEvent() %}#}
                        {#{{ representation.getNearestEvent().date }}#}
                    {#{% else %}#}
                        {#На данный момент нет запланированых выступов.#}
                    {#{% endif %}#}
                {#</div>#}
                {#<a class="btn btn-danger more" href="/representation/view/{{  representation.id }}">Подробнее</a>#}
            {#</div>#}
        {#</div>#}
    {#</div>#}


    <div class="row event-short-container">
        <div class="col-md-3 col-sm-5" style="padding-left:0;">
            <div class="event-image">
                <img src="{{ representation.img }}" alt="{{ representation.title|e }}" style="margin-bottom:5%;border-radius: 0.3em;box-shadow: 0.1em 0.1em 0.1em #a4a4a4;">
            </div>
        </div>
        <div class="col-md-3 event-short-details">
            <h3 style="margin-top:0;font-weight:800;font-size:1.1em;text-decoration:none;text-transform:uppercase;font-family:'Tahoma';">
                <a href="/representation/view/{{  representation.id }}">{{ representation.title|e }}</a>
            </h3>
            <div class="nearest-event">
                <div>Ближайшая дата проведения:</div>
                <div>
                    {% if representation.getNearestEvent() %}
                        {{ representation.getNearestEvent().date }}
                    {% else %}
                        На данный момент нет запланированых выступов.
                    {% endif %}
                </div>
                <hr>
                <a class="btn btn-danger more" style="margin-bottom:3%;" href="/representation/view/{{  representation.id }}">Подробнее</a>
            </div>
        </div>
        <div class="col-md-6 event-short-details">
          {{ representation.description }}
        </div>
    </div>
    {% endfor %}
</div>
