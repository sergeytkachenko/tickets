<!-- BEGIN HEADER -->
<div role="navigation" class="navbar header no-margin">
    <div class="container">
        <div class="navbar-header">
            <!-- BEGIN RESPONSIVE MENU TOGGLER -->
            <button data-target=".navbar-collapse" data-toggle="collapse" class="navbar-toggle" type="button">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!-- END RESPONSIVE MENU TOGGLER -->
            <a href="/" class="navbar-brand">
                <img src="/img/logo.png" alt="Logo" style="position: relative; top: -20px;">
            </a><!-- LOGO -->
        </div>
        <!-- BEGIN CART -->
        <div class="cart-block">
            <div class="cart-info">
                <a href="<?php if ($user) { ?>/room/add <?php } else { ?> /user/login<?php } ?>">Разместить объявление</a>
            </div>
            <i class="fa fa-tag"></i>
        </div>
        <!-- END CART -->
        <!-- BEGIN NAVIGATION -->
        <div class="collapse navbar-collapse mega-menu">
            <ul class="nav navbar-nav">
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" data-delay="0" data-close-others="false" data-target="product-list.html" href="product-list.html">
                        Конкурсы
                        <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="javascrip:void(0);">Зимняя сказка</a>
                        </li>
                        <li><a href="javascrip:void(0);">Фото на обложку</a></li>
                        <li><a href="javascrip:void(0);">Выездная регистрация</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" data-delay="0" data-close-others="false" data-target="product-list.html" href="product-list.html">
                        О свадьбе
                        <i class="fa fa-angle-down"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" data-delay="0" data-close-others="false" data-target="#" href="javascript:void(0);">
                        Новости
                        <i class="fa fa-angle-down"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" data-delay="0" data-close-others="false" data-target="#" href="javascript:void(0);">
                        Журнал
                        <i class="fa fa-angle-down"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" data-delay="0" data-close-others="false" data-target="#" href="javascript:void(0);">
                        Контакты
                        <i class="fa fa-angle-down"></i>
                    </a>
                </li>
                <li class="dropdown ">
                    <a href="/page/view/1">
                        О нас
                        <i class="fa fa-angle-down"></i>
                    </a>
                </li>
                <!-- BEGIN TOP SEARCH -->
                <li class="menu-search">
                    <span class="sep"></span>
                    <i class="fa fa-search search-btn"></i>
                    <div class="search-box">
                        <form action="#">
                            <div class="input-group">
                                <input type="text" placeholder="Что искать?" class="form-control">
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary" type="submit">Поиск</button>
                                    </span>
                            </div>
                        </form>
                    </div>
                </li>
                <!-- END TOP SEARCH -->
            </ul>
        </div>
        <!-- END NAVIGATION -->
    </div>
</div>
<!-- END HEADER -->

