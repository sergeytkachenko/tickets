<p>Добрый день! На сайте http://circus.org.ua/ были приобритены билет(ы). Детали заказа:</p>
<table  style="min-width: 600px;width:100%;border-collapse: collapse;">
    <tr>
        <th style="border:1px solid #333;padding: 3px;">Мероприятие, дата</th>
        <th style="border:1px solid #333;padding: 3px;">Место</th>
        <th style="border:1px solid #333;padding: 3px;">UID Билета</th>
    </tr>
    <tr>
    {% for order in orders %}
        <td style="border:1px solid #333;padding: 3px;">{{ order.EventSeats.Events.title }}, {{ order.EventSeats.Events.date }}</td>
        <td style="border:1px solid #333;padding: 3px;">{{ order.EventSeats.id }}</td>
        <td style="border:1px solid #333;padding: 3px;">{{ order.uid }}</td>
    {% endfor %}
    </tr>
</table>
