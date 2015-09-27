{% if eventSeats|length > 0 %}

    <h4>Персональная информация</h4>
    <br>
    <form class="form-horizontal" role="form" action="/order/payment/{{ eventId|e }}" method="post">
        {%  if user %}
            <div class="form-group">
                <label class="control-label col-sm-2" for="name">Полное имя *</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" placeholder="Полное имя" name="name" disabled value="{{ user.name }}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email"  >Email *</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" disabled placeholder="Электронный адрес" value="{{ user.email }}" name="email">
                </div>
            </div>
            <input  type="hidden" class="form-control" name="phone" value="">
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10" >
                    <a class="btn btn-large btn-success " role="button" href="/order/prePaymentPaymaster/{{ eventId|e }}">
                        Купить <i class="fa fa-angle-double-right"></i></a>
                </div>
            </div>
        {% else %}
            <div class="form-group">
                <label class="control-label col-sm-2" for="name">Полное имя *</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" placeholder="Полное имя" required name="name" onchange="save($(this));">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Email *</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" placeholder="Электронный адрес" required name="email" onchange="save($(this));">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="phone"> Моб. телефон *</label>
                <div class="col-sm-10">
                    <input  type="tel" pattern="[0-9]{10}" class="form-control" id="phone" placeholder="Мобильный телефон" required name="phone" onchange="save($(this));">
                    <span id="helpBlock" class="help-block">Номер должен быть в формате: 0971234477</span>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10" >
                    <button type="submit" class="btn btn-primary">Перейти к оплате</button>
                </div>
            </div>
        {% endif %}

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
                {{ eventSeat.Events.Representation.title }}({{ display_when(eventSeat.Events.date) }}), место - {{ eventSeat.Seats.title }}
            </li>
        {% endfor %}
    </ul>
	<ul class="list-group">
			<li class="list-group-item">
				<div class="fright clear">
					<span class="badge">
                        {{ round(totalSum * serviceFee / 100) }} грн.
                    </span>
					<button type="button" class="btn btn-primary btn-xs"> <span class="badge">{{ serviceFee }}%</span></button>
				</div>
				Сервисный сбор:
			</li>
	</ul>
    <div style="text-align: right">
        Всего к оплате: <h4>{{ round((totalSum * serviceFee / 100) + totalSum) }} грн.</h4>
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

    function save($input) {
        if(!window.localStorage) {return;}
        localStorage.setItem($input.attr('name'), $input.val());
    }

    $(document).ready(function () {
        $("input[required]").each(function (ind, input) {
            if(!window.localStorage) {return;}
            var $input = $(input);
            var val = localStorage.getItem($input.attr('name'));
            if(!val) {return;}
            $input.val(val);
        })
    });
</script>
