
    <!-- BEGIN SIDEBAR -->
    <div class="sidebar col-md-3 col-sm-5">
        <ul class="list-group margin-bottom-25 sidebar-menu">

            <li class="list-group-item clearfix">
                <a href="/room" >
                    Мои обьявления (<?php echo $this->length($user->ServiceItem); ?>)
                </a>
            </li>
            <li class="list-group-item clearfix">
                <a href="javascript:void(0);" >
                    Мой профиль
                </a>
            </li>
            <li class="list-group-item clearfix">
                <a href="javascript:void(0);" >
                    Статистика
                </a>
            </li>

            <li class="list-group-item clearfix">
                <a href="javascript:void(0);" >
                    Баланс (<?php echo $user->balance; ?> <span style="text-transform: none">руб.</span>)
                </a>
            </li>
        </ul>
        <div class="clearfix"> </div>
    </div>
    <!-- END SIDEBAR -->