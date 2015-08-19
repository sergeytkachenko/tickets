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
        <input type="text" class="form-control" id="uid" style="width: 110px;">
    </div>
    <div class="form-group">
        <input type="text" class="form-control">
    </div>
    <div class="form-group">
        <input type="text" class="form-control">
    </div>
    <div class="form-group">
        <input type="text" class="form-control" >
    </div>
    <div class="form-group">
        <input type="text" class="form-control" style="width: 120px;">
    </div>
    <input name="uid" type="hidden">
    <button type="button" class="btn btn-danger">Отмена билета</button>
</form>
<script>
    $("#uid-form button").on('click', function () {
        var uid = "";
        $(this).parents("form").find("input").each(function (ind, input) {
            var val = $(input).val();
            uid += val + "-";
        });
        uid = uid.substr(0, uid.length-1);
        $("input[name=uid]").val(uid);
        $("#uid-form").submit();
    });
</script>