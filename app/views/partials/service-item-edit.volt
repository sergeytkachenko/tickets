<div class="panel panel-default">
    <div class="panel-heading"><h3 class="panel-title">{{ title }}</h3></div>
    <div class="panel-body">
        <form role="form" enctype="multipart/form-data" name="main" action="/room/save" method="POST">
            <input type="hidden" name="serviceItemId"  value="{{ serviceItem.id }}" />
            <div class="form-body">
                <div class="form-group">
                    <label for="exampleInputEmail1">Название</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="" name="title" required value="{{ serviceItem.title }}">
                    <span class="help-block">Коротко о вашем обьявлении.</span>
                </div>

                <div class="form-group">
                    <label>Рубрика</label>
                    <select class="form-control" name="service_id" name="service_id">
                        <optgroup label="Категории">
                        {% for service in categoriesAllMenu %}
                            <option value="{{ service.id }}" {% if serviceItem.Services and serviceItem.Services.id == service.id %} selected {% endif %}>{{ service.title }}</option>
                        {% endfor %}
                        </optgroup>
                        <optgroup label="Услуги">
                            {% for service in servicesMenu %}
                                <option value="{{ service.id }}" {% if serviceItem.Services and serviceItem.Services.id == service.id %} selected {% endif %}>{{ service.title }}</option>
                            {% endfor %}
                        </optgroup>
                    </select>
                </div>
                <div class="form-group">
                    <label>Цена в руб.</label>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-money"></i></span>
                        <input type="text" class="form-control" placeholder="" name="price" required value="{{ serviceItem.price }}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Email адрес</label>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-envelope-o"></i></span>
                        <input type="email" class="form-control" placeholder="" name="email" value="{{ serviceItem.email }}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Телефон</label>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                        <input type="text" class="form-control" placeholder="" name="phone" value="{{ serviceItem.phone }}">
                    </div>
                </div>

                <div class="form-group">
                    <label>URL видео с youtube.com <!--<a href="javascript:void(0);" onclick="addVideo(this);" class="btn default" style="padding: 3px 7px"><i class="fa fa-plus"></i></a>--></label>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-youtube-play"></i></span>
                        {% for serviceItemVideo in serviceItem.ServiceItemVideos %}
                        <input type="text" class="form-control" placeholder="" name="youtube_src" value="{{ serviceItemVideo.youtube_src }}">
                        {% endfor %}
                        {% if serviceItem.ServiceItemVideos|length == 0 %}
                            <input type="text" class="form-control" placeholder="" name="youtube_src" >
                        {% endif %}
                    </div>
                </div>
                <div class="form-group">
                    <label>Текст объявления</label>
                    <textarea class="form-control" rows="5" name="description" required style="max-width: 100%;" >{{serviceItem.description}}</textarea>
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
        <div id="example" style="display: none;">
            <div class="dz-preview dz-processing dz-image-preview dz-success">
                <div class="dz-details">
                    <div class="dz-filename">
                        <span data-dz-name="">03tuILDUt2ag4NWqCXRQcuF3MR4_qKtkU6vwBqLVS3A.jpeg</span>
                    </div>
                    <div class="dz-size" data-dz-size=""><strong>0.3</strong> MB</div>
                    <img data-dz-thumbnail="" alt=""
                         src="">
                </div>
                <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress="" style="width: 100%;"></span>
                </div>
                <div class="dz-success-mark"><span>✔</span></div>
                <div class="dz-error-mark"><span>✘</span></div>
                <div class="dz-error-message"><span data-dz-errormessage=""></span></div>
                <button class="btn btn-sm btn-block" onclick="$(this).parents('.dz-preview').remove();">Удалить файл</button>
            </div>
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
                var imgSrc = $(val).text()[0] == "/"?$(val).text() :  "/files/"+$(val).text();
                imgSrc = imgSrc.replace("/files//files/", "/files/");
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
        getPhotosByServiceItem({{ serviceItem.id }});
    });
    {% if user.tariff_plan_id == 1 %}
    var maxCountVideo = {{ maxCountVideo }};
    setInterval(function () {
        var maxLengthDescription = '{{ maxLengthDescription }}',
            description = $("textarea[name=description]").val();
        if(description.length > maxLengthDescription) {
            $("[name=description]").val(description.substring(0, maxLengthDescription));
            alert("В бессплатном режиме, текст в описании ограничен длиной - "+maxLengthDescription)
        }
        // проверяем тип пользователя и сколько фоток загружено ()
        var previews = $("#my-dropzone .dz-preview");
        if($(previews).length <= maxCountVideo) {
            return;
        }
        $(previews).each(function (ind, val) {
            if(ind > maxCountVideo-1) $(val).remove();
        });
        alert("В бессплатном режиме, вы можете загружать максимум 4 фото");
    }, 1000);
    {% endif %}

    function getPhotosByServiceItem (serviceItemId) {
        if(!serviceItemId) return;
        var example = $("div#example > div").clone();
        $(example).find("span[data-dz-name]").text('{{ serviceItem.logo_src }}');
        $(example).find("img[data-dz-thumbnail]").attr("src", '{{ serviceItem.logo_src }}');
        $(example).find("img[data-dz-thumbnail]").attr("alt", '{{ serviceItem.logo_src }}');

        $("form#my-dropzone").append(example);
        $.post("/service-item/getPhotos/"+serviceItemId, {}, function (data) {
            for(var i in data) {
                var image = data[i];
                var example = $("div#example > div").clone();
                $(example).find("span[data-dz-name]").text(image.img_src);
                $(example).find("img[data-dz-thumbnail]").attr("src", image.img_src);
                $(example).find("img[data-dz-thumbnail]").attr("alt", image.img_src);

                $("form#my-dropzone").append(example);
            }
        })
    }
</script>