<div class="panel panel-default">
    <div class="panel-heading"><h3 class="panel-title">Добавление обьявления</h3></div>
    <div class="panel-body">
        <form role="form" enctype="multipart/form-data" name="main" action="/room/save">
            <div class="form-body">
                <div class="form-group">
                    <label for="exampleInputEmail1">Название</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="" name="title" required>
                    <span class="help-block">Коротко о вашем обьявлении.</span>
                </div>

                <div class="form-group">
                    <label>Рубрика</label>
                    <select class="form-control" name="service_id" name="service_id">
                        <?php foreach ($services as $service) { ?>
                            <option value="<?php echo $service->id; ?>"><?php echo $service->title; ?></option>
                        <?php } ?>
                    </select>
                </div>
                <div class="form-group">
                    <label>Цена в руб.</label>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-money"></i></span>
                        <input type="text" class="form-control" placeholder="" name="price" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Email адрес</label>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-envelope-o"></i></span>
                        <input type="email" class="form-control" placeholder="" name="email">
                    </div>
                </div>
                <div class="form-group">
                    <label>Телефон</label>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                        <input type="text" class="form-control" placeholder="" name="phone">
                    </div>
                </div>

                <div class="form-group">
                    <label>URL видео с youtube.com <!--<a href="javascript:void(0);" onclick="addVideo(this);" class="btn default" style="padding: 3px 7px"><i class="fa fa-plus"></i></a>--></label>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-youtube-play"></i></span>
                        <input type="text" class="form-control" placeholder="" name="youtube_src">
                    </div>
                </div>
                <div class="form-group">
                    <label>Описание</label>
                    <textarea class="form-control" rows="5" name="description" required></textarea>
                </div>
                <input type="hidden" name="photos" value="">
                <input type="hidden" name="logo" value="">
            </div>

        </form>
        <h4 style="text-align: left; font-size: 1.4em;">Фотографии</h4>
        <form  role="form" enctype="multipart/form-data" class="dropzone" id="my-dropzone" action="/file/save">

        </form>
        <br>
        <div class="form-actions">
            <button type="submit" class="btn blue" id="save">Сохранить</button>
            <a role="button" class="btn default" href="/room/">Отмена</a>
        </div>
    </div>
</div>
<script>
    function addVideo (me) {
        var input = $(me).parents("div.form-group").find(".input-group input").clone();
        $(me).parents("div.form-group").find(".input-group").append(input);
    }
    $(document).ready(function () {
        $("button#save").on("click", function () {
            var images = [];
            $("#my-dropzone .dz-filename span").each(function (ind, val) {
                var imgSrc = "/files/"+$(val).text();
                if(ind==0) {
                    $("input[name=logo]").val(imgSrc);
                    return;
                }
                images.push(imgSrc);
            });
            $("input[name=photos]").val(images.join(","));
            var req = true;
            $("[required]").each(function (ind, val) {
                if($(val).val() == "") {
                    req = false;
                    $(val).trigger("focus");
                    alert("Заполните обязательно поле");
                    return false;
                }
            });
            if(req) $("form[name=main]").submit();
        });
    })
</script>