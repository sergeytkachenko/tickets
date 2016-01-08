<h2 style="font-family:Tahoma,sans-serif;font-size:1.4em;font-weight:600;text-transform:uppercase;color:#337ab7;text-indent: 0.3em;margin-bottom:1em;">
	{{ event.Representation.title }}, {{ event.date }}
</h2>
<form>
<div class="col-md-3">
	<select onchange="getEvents();" id="representation">
		{% for r in representations %}
		<option value="{{ r.id }}"  {% if r.id == representation.id %} selected {% endif %}>{{ r.title }}</option>
		{% endfor %}
	</select>
</div>
<div class="col-md-3">
	<select  id="event" onchange="reloadPage();">
		{% for e in events %}
			<option value="{{ e.id }}" {% if e.id == event.id %} selected {% endif %}>{{ e.date }}</option>
		{% endfor %}
	</select>
</div>
</form>
<div class="col-md-6">	
<input id="tablesearchinput" type="text" class="form-control" placeholder="Поиск" /></label><br>
</div>
<table class="table table-striped">
	<tr>
		<th>Место</th>
		<th>ФИО</th>
		<th>Email</th>
		<th>Телефон</th>
		<th>UID</th>
		<th>Дата покупки</th>
		<th>Цена</th>
	</tr>
	{% for m in purchasedList %}
	<tr>
		<td>{{ m['seat_title'] }}</td>
		<td>{{ m['user_name'] }}</td>
		<td>{{ m['user_email'] }}</td>
		<td>{{ m['user_phone'] }}</td>
		<td>{{ m['uid'] }}</td>
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
