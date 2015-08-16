{% if success is defined %}
    <div class="row">
        <h3>Оплата осуществляется системой LiqPay</h3>
        {{ html }}
        <a href="https://www.liqpay.com/" target="_blank">Подробнее</a>
    </div>
{% else %}
    <div>
        Сожалеем, но оплата не удалась, попробуйте чуть позже
    </div>
{% endif %}