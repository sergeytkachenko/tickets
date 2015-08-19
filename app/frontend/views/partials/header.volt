<div class="container-fluid">
    <div class="navbar-header">
        <a class="navbar-brand" href="/">Покупка билетов онлайн</a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
            <li {% if router.getRewriteUri() == '/event/list' %}class="active"{% endif %}><a href="/event/list">Мероприятия</a></li>
            {%  if user %}
                <li class="dropdown" style="height: 50px; margin-left: 10px;">
                    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false" style="height: 50px;">
                        {{ user.email }}
                        <span class="caret"></span>
                    </button>

                    <!-- role="menu": fix moved by arrows (Bootstrap dropdown) -->
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="/order/history"><i class="fa fa-history"></i> История покупок</a></li>
                        <li><a href="/order/cancel"><i class="fa fa-ban"></i> Отмена билета</a></li>
                        <li><a href="/order/printByUid"><i class="fa fa-print"></i> Печать билета по UID</a></li>
                        <li class="divider"></li>
                        <li><a href="/user/exit">Выход</a></li>
                    </ul>

                </li>
            {% endif %}

        </ul>
    </div><!--/.nav-collapse -->
</div><!--/.container-fluid -->