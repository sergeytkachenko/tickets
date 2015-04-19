<div class="row product-list">
    {% for service in services %}
    <!-- PRODUCT ITEM START -->
    <div class="col-md-4 col-sm-6 col-xs-12">
        <div class="product-item">
            <div class="pi-img-wrapper">
                <a href="/service-item/list/{{ service.id }}"><img src="{{ service.img_src }}" class="img-responsive" alt="{{ service.title|e }}"></a>
            </div>
            <h3><a href="/service-item/list/{{ service.id }}">{{ service.title|e }} ({{ count_service_item(currentCity.id, service.id) }})</a></h3>
        </div>
    </div>
    <!-- PRODUCT ITEM END -->
    {% endfor %}
</div>