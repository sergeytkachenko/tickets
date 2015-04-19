
    <!-- BEGIN SIDEBAR -->
    <div class="sidebar col-md-3 col-sm-5">
        <ul class="list-group margin-bottom-25 sidebar-menu">
            <li class="list-group-item clearfix dropdown active">
                <a href="javascript:void(0);" class="collapsed">
                    <i class="fa fa-angle-right"></i>
                    Рубрики
                    <i class="fa fa-angle-down"></i>
                </a>
                <ul class="dropdown-menu" style="display:block;">
                    {% for category in categoriesMenu %}
                        {% set url =  "/service-item/list/" ~ category.id %}
                    <li class="{% if router.getRewriteUri() == url %}active{% endif %}">
                        <a href="/service-item/list/{{ category.id }}" ><i class="fa fa-circle"></i>{{ category.title }} ({{ count_service_item(currentCity.id, category.id) }})</a>
                    </li>
                    {% endfor %}
                </ul>
            </li>
            <li class="list-group-item clearfix dropdown active">
                <a href="javascript:void(0);">
                    <i class="fa fa-angle-right"></i>
                    Услуги
                    <i class="fa fa-angle-down"></i>
                </a>
                <ul class="dropdown-menu">
                    {% for service in servicesMenu %}
                        {% set url =  "/service-item/list/" ~ service.id %}
                        <li class="{% if router.getRewriteUri() == url %}active{% endif %}">
                            <a href="/service-item/list/{{ service.id }}" ><i class="fa fa-circle"></i>{{ service.title }} ({{ count_service_item(currentCity.id, service.id) }})</a>
                        </li>
                    {% endfor %}

                    {#<li>#}
                        {#<a href="javascript:void(0);" class="collapsed"><i class="fa fa-circle "></i> Артисты </i><i class="fa fa-angle-down"></i></a>#}
                        {#<ul class="dropdown-menu" style="display:block;">#}
                            {#<li >#}
                                {#<a href="javascript:void(0);"><i class="fa fa-circle"></i> ТАНЦОРЫ</a>#}
                            {#</li>#}
                            {#<li >#}
                                {#<a href="javascript:void(0);" ><i class="fa fa-circle"></i> ФОКУРСНИКИ </a>#}
                            {#</li>#}
                            {#<li >#}
                                {#<a href="javascript:void(0);" ><i class="fa fa-circle"></i> КЛОУНЫ </a>#}
                            {#</li>#}
                            {#<li >#}
                                {#<a href="javascript:void(0);" ><i class="fa fa-circle"></i> ЮМОРИСТЫ </a>#}
                            {#</li>#}
                        {#</ul>#}
                    {#</li>#}
                    {#<li><a href="javascript:void(0);"><i class="fa fa-circle"></i> Аниматоры</a></li>#}
                    {#<li>#}
                        {#<a href="javascript:void(0);" class="collapsed"><i class="fa fa-circle " ></i> Эксклюзивные услуги </i><i class="fa fa-angle-down"></i></a>#}
                        {#<ul class="dropdown-menu" style="display:block;">#}
                            {#<li >#}
                                {#<a href="javascript:void(0);"><i class="fa fa-circle"></i> мимы</a>#}
                            {#</li>#}
                            {#<li >#}
                                {#<a href="javascript:void(0);" ><i class="fa fa-circle"></i> шаржисты </a>#}
                            {#</li>#}
                            {#<li >#}
                                {#<a href="javascript:void(0);" ><i class="fa fa-circle"></i> живые статуи </a>#}
                            {#</li>#}
                            {#<li >#}
                                {#<a href="javascript:void(0);" ><i class="fa fa-circle"></i> костюмированное шоу </a>#}
                            {#</li>#}
                        {#</ul>#}
                    {#</li>#}
                </ul>
            </li>
        </ul>

        <!--            <div class="sidebar-filter margin-bottom-25">-->
        <!--                <h2>Filter</h2>-->
        <!--                <h3>Availability</h3>-->
        <!--                <div class="checkbox-list">-->
        <!--                    <label><input type="checkbox"> Not Available (3)</label>-->
        <!--                    <label><input type="checkbox"> In Stock (26)</label>-->
        <!--                </div>-->
        <!---->
        <!--                <h3>Price</h3>-->
        <!--                <p>-->
        <!--                    <label for="amount">Range:</label>-->
        <!--                    <input type="text" id="amount" style="border:0; color:#f6931f; font-weight:bold;">-->
        <!--                </p>-->
        <!--                <div id="slider-range"></div>-->
        <!--            </div>-->

        <div class="clearfix"> </div>
    </div>
    <!-- END SIDEBAR -->