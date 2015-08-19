<form class="form-inline uid" role="form" id="uid-form">
    <div class="form-group">
        <label for="uid">UID билета:</label>
        <input type="text" class="form-control" id="uid" name="uid" style="width: 300px;">
    </div>

    <button type="button" class="btn btn-default">Поиск</button>
</form>
<script>
    $("#uid-form button").on('click', function () {
        var uid = $("input[name=uid]").val();
        location.href = "/order/print/"+ uid;
    });
</script>