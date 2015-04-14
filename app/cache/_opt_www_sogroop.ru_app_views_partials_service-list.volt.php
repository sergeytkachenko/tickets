<div class="row product-list">
    <?php foreach ($services as $service) { ?>
    <!-- PRODUCT ITEM START -->
    <div class="col-md-4 col-sm-6 col-xs-12">
        <div class="product-item">
            <div class="pi-img-wrapper">
                <a href="/service-item/list/<?php echo $service->id; ?>"><img src="<?php echo $service->img_src; ?>" class="img-responsive" alt="<?php echo $this->escaper->escapeHtml($service->title); ?>"></a>
            </div>
            <h3><a href="/service-item/list/<?php echo $service->id; ?>"><?php echo $this->escaper->escapeHtml($service->title); ?> (<?php echo $this->length($service->ServiceItem); ?>)</a></h3>
        </div>
    </div>
    <!-- PRODUCT ITEM END -->
    <?php } ?>
</div>