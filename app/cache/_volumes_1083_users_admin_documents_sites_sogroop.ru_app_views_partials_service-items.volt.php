<div class="row list-view-sorting clearfix">
    <?php if ($this->length($items) > 0) { ?>
    <div class="col-md-2 col-sm-2 list-view">
        <a href="/product/view/1-item.html"><i class="fa fa-th-large"></i></a>
        <a href="/product/view/1-item.html"><i class="fa fa-th-list"></i></a>
    </div>
    <div class="col-md-10 col-sm-10">
        <div class="pull-right">
            <label class="control-label">Показывать :</label>
            <select class="form-control input-sm">
                <option value="#?limit=24" selected="selected">24</option>
                <option value="#?limit=25">25</option>
                <option value="#?limit=50">50</option>
                <option value="#?limit=75">75</option>
                <option value="#?limit=100">100</option>
            </select>
        </div>
        <div class="pull-right">
            <label class="control-label">Сортировать по:</label>
            <select class="form-control input-sm">
                <option value="#?sort=pd.name&amp;order=ASC">Имени (А - Я)</option>
                <option value="#?sort=pd.name&amp;order=DESC">Имени (Я - А)</option>
                <option value="#?sort=p.price&amp;order=ASC">Цене (Меньше &gt; Больше)</option>
                <option value="#?sort=p.price&amp;order=DESC">Цене (Больше &gt; Меньше)</option>
                <option value="#?sort=rating&amp;order=DESC">Рейтингу (Лучшие сверху)</option>
                <option value="#?sort=rating&amp;order=ASC">Рейтингу (Худшие сверху)</option>
                <option value="#?sort=date&amp;order=DESC">Дате (Новые сверху)</option>
                <option value="#?sort=date&amp;order=ASC">Дате (Старые сверху)</option>
            </select>
        </div>
    </div>
    <?php } else { ?>
        <div class="col-md-12 col-sm-12 ">
            <p class="bg-warning"  style="padding: 20px">
                <strong>Записи в этой категории не найдены.</strong>
            </p>
        </div>
    <?php } ?>
</div>
<!-- BEGIN PRODUCT LIST -->
<div class="row product-list">
    <?php foreach ($items as $item) { ?>
    <!-- PRODUCT ITEM START -->
    <div class="col-md-12">
        <div class="product-item <?php if ($item->is_vip) { ?> vip <?php } ?>">
            <div class="photo">
                <a href="/service-item/view/<?php echo $item->id; ?>">
                    <img src="/timthumb.php?h=170&src=<?php echo $item->logo_src; ?>" />
                </a>
                <div class="pi-price">
                    <span class="price"><?php echo $item->price; ?> руб</span>
                    <span class="date"><i class="fa fa-tags"></i> <?php echo $item->date_post; ?></span>
                </div>
            </div>
            <h3><a href="/service-item/view/<?php echo $item->id; ?>"><?php echo $item->title; ?></a></h3>
            <div class="description"><?php echo $item->short_description; ?></div>
            <div class="navigation">

                <a href="/service-item/view/<?php echo $item->id; ?>" class="btn btn-default add2cart">Подробнее</a>
            </div>
        </div>
    </div>
    <!-- PRODUCT ITEM END -->
    <?php } ?>
</div>
<!-- END PRODUCT LIST -->
<?php if ($this->length($items) > 0) { ?>
<!-- BEGIN PAGINATOR -->
<div class="row" style="display: none">
    <!--                <div class="col-md-4 col-sm-4 items-info">Записей с 1 по 9, 10  всего</div>-->
    <div class="col-md-8 col-sm-8">
        <ul class="pagination pull-right">
            <li><a href="/product/view/1-item.html">&laquo;</a></li>
            <li><a href="/product/view/1-item.html">1</a></li>
            <li><span>2</span></li>
            <li><a href="/product/view/1-item.html">3</a></li>
            <li><a href="/product/view/1-item.html">4</a></li>
            <li><a href="/product/view/1-item.html">5</a></li>
            <li><a href="/product/view/1-item.html">&raquo;</a></li>
        </ul>
    </div>
</div>

<!-- END PAGINATOR -->
<?php } ?>