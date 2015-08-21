<div>
    {% for representation in representations %}
    <div class="row event-short-container">
        <div class="col-md-8" style="padding-left: 0">
            <div class="event-image">
                <img src="{{ representation.img }}" alt="{{ representation.title|e }}">
            </div>
        </div>
        <div class="col-md-4 event-short-details">
            <h3><a href="/representation/view/{{  representation.id }}">{{ representation.title|e }}</a></h3>
            <p>{{ representation.description }}</p>
            <div class="nearest-event">
                <div>Ближайшая дата проведения:</div>
                <div>
                    {% if representation.getNearestEvent() %}
                        {{ representation.getNearestEvent().date }}
                    {% else %}
                        На данный момент нет запланированых выступов.
                    {% endif %}
                </div>
                <a class="btn btn-primary more" href="/representation/view/{{  representation.id }}">Подробнее</a>
            </div>
        </div>
    </div>
    {% endfor %}
</div>