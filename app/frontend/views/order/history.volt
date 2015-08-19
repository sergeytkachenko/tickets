{% for orderHistory in orderHistories %}
    <a href="/order/paymentPaymaster/{{ orderHistory.uids }}">{{ orderHistory.datetime }}</a><br>
{% endfor %}

{% if orderHistories|length == 0 %}
    <h4>На данный момент, вы еще не совершали покупок в кассе</h4>
{% endif %}