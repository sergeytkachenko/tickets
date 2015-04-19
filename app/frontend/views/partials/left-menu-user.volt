
    <!-- BEGIN SIDEBAR -->
    <div class="sidebar col-md-3 col-sm-5">
        <ul class="list-group margin-bottom-25 sidebar-menu">

            <li class="list-group-item clearfix">
                <a href="/room" >
                    Мои обьявления ({{ user.ServiceItem|length }})
                </a>
            </li>
            <li class="list-group-item clearfix">
                <a href="javascript:void(0);" >
                    Баланс ({{ user.balance }} <span style="text-transform: none">руб.</span>)
                </a>
            </li>
            <li class="list-group-item clearfix">
                <a href="javascript:void(0);" >
                    Мои сообщения
                </a>
                <ul class="dropdown-menu" style="display:block;">
                    <li class="list-group-item  clearfix {% if router.getRewriteUri() == '/message/write' %}active{% endif %}">
                        <a href="/message/write"><i class="fa fa-circle"></i> Написать сообщение</a>
                    </li>
                    <li class="list-group-item  clearfix {% if router.getRewriteUri() == '/message/inbox' %}active{% endif %}">
                        <a href="/message/inbox"><i class="fa fa-circle"></i> Входящие ({{ user.MessagesRecipient|length}})</a>
                    </li>
                    <li class="list-group-item  clearfix {% if router.getRewriteUri() == '/message/send' %}active{% endif %}">
                        <a href="/message/send"><i class="fa fa-circle"></i> Отправленые ({{ user.MessagesSender|length  }})</a>
                        </li>
                </ul>
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
        </ul>
        <div class="clearfix"> </div>
    </div>
    <!-- END SIDEBAR -->