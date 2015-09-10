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
        <div class="col-md-3" style="padding-left:0;">
            <div class="event-image">
                <img src="{{ representation.img }}" alt="{{ representation.title|e }}">
            </div>
        </div>
        <div class="col-md-3 event-short-details">
            <h3 style="margin-top:0;font-weight:800;font-size:1.1em;text-decoration:none;text-transform:uppercase;font-family:'Tahoma';">
                <a href="/representation/view/{{  representation.id }}">{{ representation.title|e }}</a>
            </h3>
            <div class="nearest-event">
                <div>
                    {% if representation.getNearestEvent() %}
                        {{ representation.getNearestEvent().date }}
                    {% else %}
                        На данный момент нет запланированых выступов.
                    {% endif %}
                </div>
                <hr style=" border: 0; width:14em;float:left;margin-top:3%;height: 0.05em;background: #333;background-image: linear-gradient(to right, #ccc, #ccc, #ccc);">
                <a class="btn btn-primary more" href="/representation/view/{{  representation.id }}">Подробнее</a>
            </div>
        </div>
        <div class="col-md-6 event-short-details">
            {{ representation.description }}
        </div>
    </div>
    {% endfor %}
</div>
