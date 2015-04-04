
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
                    Мои сообщения
                </a>
                <ul class="dropdown-menu" style="display:block;">
                    <li class="list-group-item  clearfix <?php if ($this->router->getRewriteUri() == '/message/write') { ?>active<?php } ?>">
                        <a href="/message/write"><i class="fa fa-circle"></i> Написать сообщение</a>
                    </li>
                    <li class="list-group-item  clearfix <?php if ($this->router->getRewriteUri() == '/message/inbox') { ?>active<?php } ?>">
                        <a href="/message/inbox"><i class="fa fa-circle"></i> Входящие (<?php echo $this->length($user->MessagesRecipient); ?>)</a>
                    </li>
                    <li class="list-group-item  clearfix <?php if ($this->router->getRewriteUri() == '/message/send') { ?>active<?php } ?>">
                        <a href="/message/send"><i class="fa fa-circle"></i> Отправленые (<?php echo $this->length($user->MessagesSender); ?>)</a>
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

            <li class="list-group-item clearfix">
                <a href="javascript:void(0);" >
                    Баланс (<?php echo $user->balance; ?> <span style="text-transform: none">руб.</span>)
                </a>
            </li>
        </ul>
        <div class="clearfix"> </div>
    </div>
    <!-- END SIDEBAR -->