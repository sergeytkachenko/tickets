<div class="row">
    {% if events|length %}
    <div class="col-md-11">
        <div class="description-event" style="margin-bottom: 20px;">
            <a href="/representation/list" class="btn btn-default" role="button">
                <i class="fa fa-arrow-left"></i> Все представления
            </a>
        </div>
    </div>
    <div class="col-md-3">
        <div class="logo">
            <a href="/"><img src="/img/logo.png" alt="Цирк України"></a>
        </div>
        <div class="poster">
            <img src="{{ representation.img }}" alt="Афіша" height="345">
        </div>
    </div>
    <div class="col-md-8">
        <div class="jumbotron" style="width:100%; background-color: #fff; padding:3%; float: right;">
            <div class="tbl-responsive">
                <table class="table">
                    {% for event in events %}
                        <tr class="backgr-grey">
                            <td class="tbl-day"><h4>{{ event.date|getDay }}</h4></td>
                            <td class="tbl-date"><h4>{{ event.date|getMonthName }}<br><span>{{ event.date|getDayName }}</span></h4></td>
                            <td class="tbl-time"><h4>{{ event.date|getHours }}:{{ event.date|getMinutes }}</h4></td>
                            <td class="tbl-show"><h4>{{ representation.title }}</h4></td>
                            <td class="tbl-buy"><a class="btn btn-primary more" href="/event/view/{{ event.id }}">Купить билет</a></td>
                        </tr>
                    {% endfor %}
                </table>
            </div>
        </div>
    </div>
    {% else %}
        <h4>На это мероприятие представлений нет. Попробуйте зайти позже.</h4>
    {% endif %}
</div>
