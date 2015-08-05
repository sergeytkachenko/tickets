{% if eventSeats|length > 0 %}

    <h4>Персональная информация</h4>
    <br>
    <form class="form-horizontal" role="form" action="/order/payment/{{ eventId|e }}" method="post">
        <div class="form-group">
            <label class="control-label col-sm-2" for="name">Полное имя *</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="name" placeholder="Полное имя" required name="name">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="email">Email *</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="email" placeholder="Электронный адрес" required name="email">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="phone"> Моб. телефон *</label>
            <div class="col-sm-10">
                <input  type="tel" pattern="[0-9]{10}" class="form-control" id="phone" placeholder="Мобильный телефон" required name="phone">
                <span id="helpBlock" class="help-block">Номер должен быть в формате: 0971234477</span>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10" >
                <button type="submit" class="btn btn-primary">Перейти к оплате</button>
            </div>
        </div>
    </form>
    <hr>

    <h4>Список выбранных билетов</h4>

    <ul class="list-group">
        {% for eventSeat in  eventSeats %}
            <li class="list-group-item">
                <div class="fright clear">
                    <span class="badge">
                        {{ eventSeat.price }} грн.
                    </span>
                    <button type="button" class="delete-reservation btn btn-danger  btn-xs"
                            data-url="/reservation/seatClear/{{ eventSeat.Seats.id }}?eventId={{ eventSeat.Events.id }}">Отмена</button>
                </div>
                {{ eventSeat.Events.title }}({{ display_when(eventSeat.Events.date) }}), место - {{ eventSeat.Seats.title }}({{ eventSeat.Seats.id }})
            </li>
        {% endfor %}
    </ul>
    <div style="text-align: right">
        Всего к оплате: <h4>{{ totalSum }} грн.</h4>
    </div>

{% else %}
    <div>
        Сожалеем, но у вас нет выбраных билетов. Пожалуйста, выберите нужные вам билеты повторно.
    </div>
{% endif %}
<script>
    $(".delete-reservation").on("click", function () {
        var prt = confirm("Вы дествительно хотите отменить покупку билета?");
        if(!prt){return;}

        var deleteUrl = $(this).attr('data-url');
        $.ajax(deleteUrl, {
            success : function () {
                location.reload();
            },

            error : function () {
                alert('Произошла ошибка, попробуйте позже...');
            }
        });
    });
</script>