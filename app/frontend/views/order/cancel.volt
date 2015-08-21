{% if success is defined %}
    <div class="alert alert-success">
        <p>
            {{ success }}
        </p>
    </div>
{% endif %}
{% if error is defined %}
    <div class="alert alert-danger">
        <p>
            {{ error }}
        </p>
    </div>
{% endif %}
<form class="form-inline uid" role="form" action="/order/cancel" id="uid-form">
    <div class="form-group">
        <label for="uid">UID билета:</label>
        <input type="text" class="form-control" id="uid" name="uid" style="width: 300px;">
    </div>

    <button type="submit" class="btn btn-danger">Отмена билета</button>
</form>
