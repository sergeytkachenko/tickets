<div class="row list-view-sorting clearfix">
    {% if page.items|length > 0 %}
    <div class="col-md-2 col-sm-2 list-view">
        <a href="/product/view/1-item.html"><i class="fa fa-th-large"></i></a>
        <a href="/product/view/1-item.html"><i class="fa fa-th-list"></i></a>
    </div>
    <div class="col-md-10 col-sm-10">
        <form action="" method="get" id="list-control">
            <div class="pull-right">
                <label class="control-label">Показывать :</label>
                <select class="form-control input-sm" onchange="$('#list-control').submit();" name="countInPage">
                    <option value="3" {% if countInPage == 3 %} selected {% endif %}>3</option>
                    <option value="24" {% if countInPage == 24 %} selected {% endif %}>24</option>
                    <option value="50" {% if countInPage == 50 %} selected {% endif %}>50</option>
                    <option value="75" {% if countInPage == 75 %} selected {% endif %}>75</option>
                    <option value="100" {% if countInPage == 100 %} selected {% endif %}>100</option>
                </select>
            </div>
            <div class="pull-right">
                <label class="control-label">Сортировать по:</label>
                <select class="form-control input-sm" name="sortType"  onchange="$('#list-control').submit();">
                    <option value="1" {% if sortType == 1 %} selected {% endif %}>Имени (А - Я)</option>
                    <option value="2" {% if sortType == 2 %} selected {% endif %}>Имени (Я - А)</option>
                    <option value="3" {% if sortType == 3 %} selected {% endif %}>Цене (Меньше &gt; Больше)</option>
                    <option value="4" {% if sortType == 4 %} selected {% endif %}>Цене (Больше &gt; Меньше)</option>
                    <option value="5" {% if sortType == 5 %} selected {% endif %}>Дате (Старые сверху)</option>
                    <option value="6" {% if sortType == 6 %} selected {% endif %}>Дате (Новые сверху)</option>
                </select>
            </div>
        </form>
    </div>
    {% else  %}
        <div class="col-md-12 col-sm-12 ">
            <p class="bg-warning"  style="padding: 20px">
                <strong>Записи в этой категории не найдены.</strong>
            </p>
        </div>
    {% endif %}
</div>
<!-- BEGIN PRODUCT LIST -->
<div class="row product-list">
    {% for item in page.items %}
    <!-- PRODUCT ITEM START -->
    <div class="col-md-12">
        <div class="product-item {% if item.is_vip %} vip {% endif %}">
            <div class="photo">
                <a href="/service-item/view/{{ item.id }}">
                    <img src="/timthumb.php?h=170&src={{ item.logo_src }}" />
                </a>
                <div class="pi-price">
                    <span class="price">{{ item.price }} руб</span>
                    <span class="date"><i class="fa fa-tags"></i> {{ item.date_post }}</span>
                </div>
            </div>
            <h3><a href="/service-item/view/{{ item.id }}">{{ item.title }}</a></h3>
            <div class="description">{{ item.short_description }}</div>
            <div class="navigation">

                <a href="/service-item/view/{{ item.id }}" class="btn btn-default add2cart">Подробнее</a>
            </div>
        </div>
    </div>
    <!-- PRODUCT ITEM END -->
    {% endfor %}
</div>
<!-- END PRODUCT LIST -->

{% if page.items|length > 0 and page.total_pages > 1 %}
<!-- BEGIN PAGINATOR -->
<div class="row">
    <!--                <div class="col-md-4 col-sm-4 items-info">Записей с 1 по 9, 10  всего</div>-->
    <div class="col-md-8 col-sm-8">
        <ul class="pagination pull-right">
            <li>
                <a href="#">&laquo;</a>
            </li>
            {% for index in 1..page.total_pages %}
                <li {% if page.current == index %}class="active"{% endif %} >
                    <a href="?page={{ index }}">{{ index }}</a>
                </li>
            {% endfor %}
            <li>
                <a href="#">&raquo;</a>
            </li>
        </ul>
    </div>
</div>
<!-- END PAGINATOR -->
{% endif %}