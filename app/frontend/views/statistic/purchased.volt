<form>
	<select onchange="getEvents();" id="representation">
		{% for r in representations %}
		<option value="{{ r.id }}"  {% if r.id == representation.id %} selected {% endif %}>{{ r.title }}</option>
		{% endfor %}
	</select>
	<select  id="event" onchange="reloadPage();">
		{% for e in events %}
			<option value="{{ e.id }}" {% if e.id == event.id %} selected {% endif %}>{{ e.date }}</option>
		{% endfor %}
	</select>
</form>
<h2>
	{{ event.Representation.title }}, {{ event.date }}
</h2>
<table class="table table-striped">
	<tr>
		<th>Место</th>
		<th>ФИО</th>
		<th>Email</th>
		<th>Телефон</th>
		<th>Дата покупки</th>
		<th>Цена</th>
	</tr>
	{% for m in purchasedList %}
	<tr>
		<td>{{ m['seat_title'] }}</td>
		<td>{{ m['user_name'] }}</td>
		<td>{{ m['user_email'] }}</td>
		<td>{{ m['user_phone'] }}</td>
		<td>{{ display_when(m['date_buy']) }}</td>
		<td>{{ m['price'] }}</td>
	</tr>
	{% endfor %}
</table>
<script>
	function getEvents () {
		var id = $('#representation').val();
		$.post('/statistic/getEvents/' + id, function( data ) {
			var options = '';
			$.each(data, function (key, val) {
				options += '<option value="'+val.id+'">'+val.date+'</option>';
			});
			$("select#event").html(options);
		});
	}

	function reloadPage() {
		location.href = '/statistic/purchased/' + $("select#event").val();
	}
</script>