<div class="product-page">
    <div class="row">
        <div class="col-md-6 col-sm-6">
            <div class="product-main-image">
                <img src="/timthumb.php?w=387&src={{ item.logo_src }}" alt="" class="img-responsive" data-BigImgSrc="{{ item.logo_src }}">
            </div>
            <div class="product-other-images">
                <a href="javascript:void(0);" onclick="clickZoom(this);" style="display: inline;">
                    <img alt="" src="/timthumb.php?w=387&src={{ item.logo_src }}" data-BigImgSrc="{{ item.logo_src }}">
                </a>
                {% for serviceItemImage in item.ServiceItemImages  %}
                <a href="javascript:void(0);" onclick="clickZoom(this);">
                    <img alt="" src="/timthumb.php?w=387&src={{ serviceItemImage.img_src }}" data-BigImgSrc="{{ serviceItemImage.img_src }}">
                </a>
                {% endfor %}
            </div>
        </div>
        <div class="col-md-6 col-sm-6">
            <h1>{{ item.title }}</h1>
            <div class="price-availability-block clearfix">
                <div class="price">
                    <strong>{{ item.price }} <span>руб </span></strong>
                    <!--                    <em>$<span>62.00</span></em>-->
                </div>
                <div class="availability">
                    <!--                    Availability: <strong>In Stock</strong>-->
                </div>
            </div>
            <div class="description">
                {{ item.description }}
            </div>
            <div class="product-page-cart">
                <br>
                <button class="btn btn-primary" type="submit">Показать контакты</button>
            </div>
            <div class="review">
                <input type="range" value="4" step="0.25" id="backing4">
                <div class="rateit" data-rateit-backingfld="#backing4" data-rateit-resetable="false"  data-rateit-ispreset="true" data-rateit-min="0" data-rateit-max="5">
                </div>
                <a href="#">{{ item.ServiceItemComments|length }} комментариев</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Написать комментарий</a>
            </div>
            <ul class="social-icons">
                <li><a class="facebook" data-original-title="facebook" href="#"></a></li>
                <li><a class="twitter" data-original-title="twitter" href="#"></a></li>
                <li><a class="googleplus" data-original-title="googleplus" href="#"></a></li>
                <li><a class="evernote" data-original-title="evernote" href="#"></a></li>
                <li><a class="tumblr" data-original-title="tumblr" href="#"></a></li>
            </ul>
        </div>

        <div class="product-page-content">
            <ul id="myTab" class="nav nav-tabs">
                <li class="active"><a href="#Video" data-toggle="tab">Видео({{ item.ServiceItemVideos|length }})</a></li>
                <li ><a href="#Reviews" data-toggle="tab">Комментарии ({{ item.ServiceItemComments|length }})</a></li>
            </ul>
            <div id="myTabContent" class="tab-content">
                <div class="tab-pane fade in active" id="Video" style="padding: 15px 0;">
                    {%  for video in item.ServiceItemVideos %}
                        <iframe width="100%" height="{{ video.height }}" src="{{ video.youtube_src }}" frameborder="0" allowfullscreen></iframe>
                    {% endfor %}
                </div>
                <div class="tab-pane fade in " id="Reviews">
                    <!--<p>There are no reviews for this product.</p>-->
                    {%  for comment in item.ServiceItemComments %}
                    <div class="review-item clearfix">
                        <div class="review-item-submitted">
                            <strong>{{ comment.date_comment }}</strong>
                            <em>{{ comment.user_name }}</em>
                            <div class="rateit" data-rateit-value="5" data-rateit-ispreset="true" data-rateit-readonly="true"></div>
                        </div>
                        <div class="review-item-content">
                            <p>{{ comment.comment }}</p>
                        </div>
                    </div>
                    {% endfor %}
                    <!-- BEGIN FORM-->
                    <form action="#" class="reviews-form" role="form">
                        <h2>Написать комментарий</h2>
                        <div class="form-group">
                            <label for="name">Имя <span class="require">*</span></label>
                            <input type="text" class="form-control" id="name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" class="form-control" id="email">
                        </div>
                        <div class="form-group">
                            <label for="review">Ваш комментарий <span class="require">*</span></label>
                            <textarea class="form-control" rows="8" id="review"></textarea>
                        </div>

                        <div class="padding-top-20">
                            <button type="submit" class="btn btn-primary">Отправить</button>
                        </div>
                    </form>
                    <!-- END FORM-->
                </div>
            </div>
        </div>

        <!--        <div class="sticker sticker-sale"></div>-->
    </div>
</div>
<script>
    function clickZoom (that) {
        var img = $(that).find("img").clone();
        $("div.product-main-image").html(img);
        $('.product-main-image').zoom({url: $(img).attr('data-BigImgSrc')});
    }
</script>
