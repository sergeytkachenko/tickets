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
                <img src="{{ representation.img }}" alt="{{ representation.title|e }}" style="border-radius: 0.3em;box-shadow: 0.1em 0.1em 0.1em #a4a4a4;">
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
                <hr style=" border: 0; width:100%;float:left;margin-top:3%;height: 0.05em;background: #333;background-image: linear-gradient(to right, #ccc, #ccc, #ccc);">
                <a class="btn btn-danger more" href="/representation/view/{{  representation.id }}">Подробнее</a>
            </div>
        </div>
        <div class="col-md-6 event-short-details">
            <p style="font-size:0.9em;text-align:justify;text-indent:1em;">Криворожский государственный цирк приглашает маленьких и взрослых криворожан посмотреть невероятную программу "Магия Чудес". Верите ли вы в магию? Нет? Тогда добро пожаловать в криворожский цирк!</p>
			<p style="font-size:0.9em;text-align:justify;text-indent:1em;">Цирковое шоу "Магия Чудес" состоит из двух частей. Программа первой построена из номеров с участием животных и выступлений гимнастов, жонглеров и эквилибриста. Здесь каждый найдет для себя выступление по душе - среди них и нежный "Вальс и голуби", и особые номера при участии маститов, питонов и даже крокодилов. А еще в первой части программы чудеса демонстрировать воздушные гимнасты на трапеции, акробаты на баллонах, они же Участники "Україна має талант". Поверьте, когда будете смотреть номера с их участием, будет казаться, что земного притяжения просто не существует!</p>
			<p style="font-size:0.9em;text-align:justify;text-indent:1em;">Вторая часть программы «Магия чудес» предлагает зрителям оценить Иллюзионное лазерное ревю "Магия Чудес" Евгения Новоселова. Этот артист за свое мастерство получил золотую медаль на Международном фестивале циркового искусства в Корее. И с первых же минут действа вы поймете за что. Потому несмотря его номера - известные и не известные - вы поверите в чудеса.</p>
        </div>
    </div>
    {% endfor %}
</div>
