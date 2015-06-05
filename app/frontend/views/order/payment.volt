{% if success is defined %}
    <div class="row">
        <p>
            <strong>{{ name }}</strong>, ваша покупка и оплата прошла успешно!
        </p>
        <p>
            На ваш email (<strong>{{ email }}</strong>) высланы детали приобретенных билетов!
            <br>
            Спасибо за то, что вы с нами!
        </p>
    </div>
{% else %}
    <div>
        Сожалеем, но оплата не удалась, попробуйте чуть позже
    </div>
{% endif %}