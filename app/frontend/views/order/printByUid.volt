<form class="form-inline uid" role="form" id="uid-form">
    <div class="form-group">
        <label for="uid">UID билета:</label>
        <input type="text" class="form-control" id="uid" style="width: 110px;" name="uid[]">
    </div>
    <div class="form-group">
        <input type="text" class="form-control"  name="uid[]">
    </div>
    <div class="form-group">
        <input type="text" class="form-control" name="uid[]" >
    </div>
    <div class="form-group">
        <input type="text" class="form-control" name="uid[]" >
    </div>
    <div class="form-group">
        <input type="text" class="form-control" style="width: 120px;" name="uid[]">
    </div>
    <button type="button" class="btn btn-default">Поиск</button>
</form>
<script>
    $("#uid-form button").on('click', function () {
        var uid = "";
        $(this).parents("form").find("input").each(function (ind, input) {
            var val = $(input).val();
            uid += val + "-";
        });
        uid = uid.substr(0, uid.length-1);
        location.href = "/order/print/"+ uid;
    });
</script>