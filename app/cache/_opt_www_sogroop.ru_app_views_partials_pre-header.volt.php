<!-- BEGIN TOP BAR -->
<div class="pre-header">
    <div class="container">
        <div class="row">
            <!-- BEGIN TOP BAR LEFT PART -->
            <div class="col-md-6 col-sm-6 additional-shop-info">
                <ul class="list-unstyled list-inline">
                    <li><i class="fa fa-phone"></i><span>+7 097 166 25 45</span></li>
                    <li class="langs-block">
                        <a href="javascript:void(0);" class="current">
                            <?php echo $currentCity->title; ?>
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <div class="langs-block-others-wrapper">
                            <div class="langs-block-others">
                                <?php foreach ($cities as $city) { ?>
                                    <?php if ($currentCity->id != $city->id) { ?>
                                        <a href="?city_id=<?php echo $city->id; ?>"><?php echo $city->title; ?></a>
                                    <?php } ?>
                                <?php } ?>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- END TOP BAR LEFT PART -->
            <!-- BEGIN TOP BAR MENU -->
            <div class="col-md-6 col-sm-6 additional-nav">
                <ul class="list-unstyled list-inline pull-right">
                    <?php if ($user) { ?>
                        <li><a href="/room"><strong>Личный кабинет</strong></a></li>
                        <li><a href="/user/exit">Выход</a></li>
                        <?php } else { ?>
                            <li><a href="/user/register">Регистрация</a></li>
                            <li><a href="/user/login">Вход</a></li>
                    <?php } ?>
                </ul>
            </div>
            <!-- END TOP BAR MENU -->
        </div>
    </div>
</div>
<!-- END TOP BAR -->