<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Покупка билетов онлайн</title>
</head>
<body style="background-color:#f8f8f8;">
<div style="width: 90%;margin: auto;background: #FFFFFF;padding:2%;border:solid 0.1em #CBCBCB;border-radius: 0.5em;">
    <a href="http://circus.org.ua"><img style="max-width: 100%; height: auto; margin: 0 auto; text-align: center;" src="http://circus.org.ua/img/logo.png"></a>
    <h3 style="font-family:sans-serif, arial;font-size:1em;text-align:center;color:#464646;">Вітаємо! Ви придбали квитки на сайті "Цирк України"</h3>
    <h3 style="font-family:sans-serif, arial;font-size:0.9em;text-align:center;color:#464646;">Деталі Вашого замовлення:</h3>
    <table style="min-width:600px;width:100%;padding-bottom:2em;">
        <tr>
            <th style="border:1px solid #A6A6A6;padding:3px;">Вистава, дата</th>
            <th style="border:1px solid #A6A6A6;padding:3px;">Місце</th>
            <th style="border:1px solid #A6A6A6;padding:3px;">Код замовлення</th>
            <th style="border:1px solid #A6A6A6;padding:3px;">Дата замовлення</th>
        </tr>
	    {% for order in orders %}
        <tr>
            <th style="border:1px solid #A6A6A6;padding:3px;">{{ order.EventSeats.Events.Representation.title }}, {{ order.EventSeats.Events.date }}</th>
            <th style="border:1px solid #A6A6A6;padding:3px;">{{ order.EventSeats.Seats.title }}</th>
            <th style="border:1px solid #A6A6A6;padding:3px;">{{ order.uid }}</th>
            <th style="border:1px solid #A6A6A6;padding:3px;">{{ order.date }}</th>
        </tr>
	    {% endfor %}
    </table>
    <h3 style="font-family:sans-serif, arial;font-size:0.9em;text-align:left;color:#FF0000;line-height:1em;">Звертаємо увагу!</h3>
    <h3 style="font-family:sans-serif, arial;font-weight:200;font-size:1em;text-align:left;color:#464646; line-height:1em;">
        Отримати квитки можна безпосередньо перед початком вистави, на яку було придбано квитки.</h3>
    <h3 style="font-family:sans-serif, arial;font-weight:200;font-size:1em;text-align:left;color:#464646;line-height:1em;">Для цього Вам потрібно повідомити касиру <b>код замовлення</b>, який вказаний у цьому повідомленні.</h3>
    <h3 style="font-family:sans-serif, arial;font-weight:200;font-size:1em;text-align:left;color:#464646;line-height:1em;">Організатори вистави не несуть відповідальності за передачу <b>коду замовлення </b>іншим особам.</h3>
    <h3 style="font-family:sans-serif, arial;font-weight:200;font-size:1em;text-align:left;color:#464646;line-height:1em;">Видача квитків починається за годину до початку вистави.</h3>
    <h3 style="font-family:sans-serif, arial;font-weight:200;font-size:1em;text-align:left;color:#464646;line-height:1em;">Квитки придбані онлайн поверненню не підлягають.</h3><br>

    <h3 style="font-family:sans-serif, arial;font-weight:200;font-size:1em;text-align:left;color:#464646; line-height: 1em;">Якщо у Вас виникли будь-які запитання, звертайтеся за нижче вказаними контактними даними:</h3>
    <h3 style="font-family:sans-serif, arial;font-size:0.8em;text-align:left;color:#464646; line-height: 1em;">Тел. 097-211-33-88</h3>
    <h3 style="font-family:sans-serif, arial;font-size:0.8em;text-align:left;color:#464646; line-height: 1em;">E-mail: info@circus.org.ua</h3>
</div>
</body>
</html>
