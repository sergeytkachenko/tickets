<div>
    {% for event in events %}
    <div class="row event-short-container">
        <div class="col-md-8" style="padding-left: 0">
            <div class="event-image">
                <img src="{{ event.img }}" alt="{{ event.title|e }}">
            </div>
        </div>
        <div class="col-md-4 event-short-details">
            <h3><a href="/event/view/{{  event.id }}">{{ event.title|e }}</a></h3>
            <p>{{ event.description }}</p>
            <div class="nearest-event">
                <div>Дата проведения мероприятия:</div>
                <div>{{ event.date }}</div>
                <a class="btn btn-primary more" href="/event/view/{{  event.id }}">Детальніше</a>
            </div>
        </div>
    </div>
    {% endfor %}
</div>