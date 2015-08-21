<div class="container-fluid" style="padding: 0;">
    <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-left">
            <li>
                <a class="navbar-brand" href="/"><img src="/img/prapor.png" alt="Прапор України"></a>
            </li>
            <li {% if router.getRewriteUri() == '/representation/list' %}class="active"{% endif %}><a href="/representation/list">Мероприятия</a></li>
            <li><a href="#">Контакты</a></li>
            <li><a href="#">Как купить билет?</a></li>
            {%  if user %}
                <li class="dropdown" style="height: 50px; margin-left: 10px; float: right">
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
    </div>
</div>